package org.vigi.business;

import lombok.extern.slf4j.Slf4j;
import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.Velocity;
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

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.StringWriter;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.format.FormatStyle;
import java.util.stream.Collectors;

/**
 * Created by vigi on 4/24/2016.
 */
@Service
@Slf4j
public class DoodleEmailService {

    private final RestTemplate restTemplate;
    private final JavaMailSender mailSender;

    @Value("${doodle.baseUrl}")
    private String doodleBaseUrl;

    @Autowired
    DoodleEmailService(RestTemplate restTemplate, JavaMailSender mailSender) {
        this.restTemplate = restTemplate;
        this.mailSender = mailSender;
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
        // date and time look like this: 20090703=815||1015
        String[] doodleTimes = doodleTimes(dt);
//        params.add(doodleTimes[0], "");
//        params.add(doodleTimes[0], doodleTimes[1] + "||" + doodleTimes[2]);
        params.add("type", "date");
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

    private String[] doodleTimes(DoodleTemplate dt) {
        if (dt.getMatchDate() == null) {
            return new String[0];
        }

        LocalDateTime ldt = LocalDateTime.ofInstant(dt.getMatchDate().toInstant(), ZoneId.systemDefault());
        String doodleDate = ldt.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String startHour = ldt.getHour() + "" + ldt.getMinute();
        String endHour = (ldt.getHour() + 1) + "" + ldt.getMinute();

        return new String[]{doodleDate, startHour, endHour};
    }

    private void sendEmails(DoodleTemplate dt, DoodleResponse doodleResponse) {
        VelocityContext context = buildEmailTemplateContext(dt, doodleResponse);
        StringWriter bodyWriter = new StringWriter();
        Velocity.evaluate(context, bodyWriter, "errorTemplate", dt.getEmailText());

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);
        try {
            String[] emails = dt.getPlayers().stream()
                    .map(p -> p.getEmail())
                    .collect(Collectors.toList())
                    .toArray(new String[0]);
            helper.setTo(emails);
            helper.setText(bodyWriter.toString(), true);
            helper.setSubject(composeSubject(dt));
            log.info("--- Sending email message");
            log.info("--- Recipients: {}", new Object[]{message.getRecipients(Message.RecipientType.TO)});
            log.info("--- Body: {}", bodyWriter);
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

        mailSender.send(message);
    }

    private String composeSubject(DoodleTemplate dt) {
        LocalDateTime ldt = LocalDateTime.ofInstant(dt.getMatchDate().toInstant(), ZoneId.systemDefault());
        String doodleDate = ldt.format(DateTimeFormatter.ofLocalizedDateTime(FormatStyle.MEDIUM));
        return String.format("%s on %s at %s", dt.getName(), doodleDate, dt.getLocation());
    }

    private VelocityContext buildEmailTemplateContext(DoodleTemplate dt, DoodleResponse doodleResponse) {
        VelocityContext context = new VelocityContext();
        context.put("matchDate", dt.getMatchDate());
        context.put("matchTime", dt.getMatchDate());
        context.put("gameLink", buildDoodleLink(doodleResponse));
        context.put("initiatorName", dt.getInitiator());
        return context;
    }

    private String buildDoodleLink(DoodleResponse doodleResponse) {
        return String.format("%s/%s", doodleBaseUrl, doodleResponse.getId());
    }

}
