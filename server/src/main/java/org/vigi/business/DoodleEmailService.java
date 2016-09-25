package org.vigi.business;

import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.vigi.domain.DoodleTemplate;
import org.vigi.domain.Player;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;
import java.io.StringReader;
import java.io.StringWriter;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Created by vigi on 4/24/2016.
 */
@Service
@Slf4j
public class DoodleEmailService {

    private final RestTemplate restTemplate;
    private final JavaMailSender mailSender;
    private final Configuration freemarkerConfiguration;

    @Value("${doodle.baseUrl}")
    private String doodleBaseUrl;

    @Autowired
    DoodleEmailService(RestTemplate restTemplate, JavaMailSender mailSender, Configuration freemarkerConfiguration) {
        this.restTemplate = restTemplate;
        this.mailSender = mailSender;
        this.freemarkerConfiguration = freemarkerConfiguration;
    }

    public void createDoodleAndSendMails(DoodleTemplate dt) {
        log.info("--- Received doodle template: '{}'.", dt);
        DoodleResponse doodleResponse = createOnlineDoodle(dt);
        log.info("--- Got response: '{}'.", doodleResponse);

        sendEmails(dt, doodleResponse);
    }

    private DoodleResponse createOnlineDoodle(DoodleTemplate dt) {
        MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        params.add("title", dt.getName());
        params.add("locName", dt.getLocation());
        params.add("initiatorAlias", dt.getInitiator());
        params.add("initiatorEmail", "gosuvigi@gmail.com");
        params.add("description", "Description");
        params.add("hidden", "false");
        params.add("ifNeedBe", "false");
        params.add("askAddress", "false");
        params.add("askEmail", "false");
        params.add("askPhone", "false");
        params.add("multiDay", "false");
        params.add("byInvitation", "false");
        params.add("withTzSupport", "false");
        params.add("optionsMode", "dates");
        params.add("options[]", doodleTimes(dt));
        params.add("20090703", "1417");
        params.add("type", "DATE");
        params.add("createdOnCalendarView", "false");
        params.add("locale", "en_US");

        try {
            ResponseEntity<DoodleResponse> responseEntity = restTemplate.postForEntity(
                    String.format("%s/np/new-polls/", doodleBaseUrl), params, DoodleResponse.class);
            return responseEntity.getBody();
        } catch (HttpClientErrorException e) {
            log.error(e.getResponseBodyAsString(), e);
            return null;
        }
    }

    private String doodleTimes(DoodleTemplate dt) {
        if (dt.getMatchDate() == null) {
            return "";
        }
        // date and time look like this: 201609282100-201609282200
        LocalDateTime dateTime1 = LocalDateTime.ofInstant(dt.getMatchDate().toInstant(), ZoneId.systemDefault());
        LocalDateTime dateTime2 = dateTime1.plusHours(1);
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("yyyyMMddHHmm");
        String formattedDateTime1 = dateTime1.format(timeFormatter);
        String formattedDateTime2 = dateTime2.format(timeFormatter);
        return formattedDateTime1 + "-" + formattedDateTime2;
    }

    private void sendEmails(DoodleTemplate dt, DoodleResponse doodleResponse) {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            String[] emails = dt.getPlayers().stream()
                    .map(Player::getEmail)
                    .collect(Collectors.toList())
                    .toArray(new String[0]);
            helper.setFrom(dt.getInitiator());
            helper.setTo(emails);
            String emailText = buildEmailText(dt, doodleResponse);
            helper.setText(emailText, true);
            helper.setSubject(composeSubject(dt));
            log.info("--- Sending email message");
            log.info("--- Recipients: {}", new Object[]{message.getRecipients(Message.RecipientType.TO)});
            log.info("--- Email text: {}", emailText);
        } catch (MessagingException | TemplateException | IOException e) {
            throw new RuntimeException(e);
        }

        mailSender.send(message);
    }

    private String composeSubject(DoodleTemplate dt) {
        return String.format("%s on %s at %s", dt.getName(), formatDoodleMatchDate(dt), dt.getLocation());
    }

    private String formatDoodleMatchDate(DoodleTemplate dt) {
        LocalDateTime ldt = LocalDateTime.ofInstant(dt.getMatchDate().toInstant(), ZoneId.systemDefault());
        return ldt.format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
    }

    private String buildEmailText(DoodleTemplate dt, DoodleResponse doodleResponse) throws IOException, TemplateException {
        Map<String, Object> emailParameters = new HashMap<>();
        emailParameters.put("doodleDate", formatDoodleMatchDate(dt));
        emailParameters.put("doodleLink", buildDoodleLink(doodleResponse));
        Template emailTemplate = new Template(dt.toString(), new StringReader(dt.getEmailText()), freemarkerConfiguration);
        StringWriter writer = new StringWriter();
        emailTemplate.process(emailParameters, writer);
        return writer.toString();
    }

    private String buildDoodleLink(DoodleResponse doodleResponse) {
        return String.format("%s/%s", doodleBaseUrl, doodleResponse.getId());
    }

}
