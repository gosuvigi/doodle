package org.vigi.business;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.vigi.domain.DoodleTemplate;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

/**
 * Created by vigi on 4/24/2016.
 */
@Service
@Slf4j
public class DoodleEmailService {

    private final RestTemplate restTemplate;

    @Value("${doodle.baseUrl}")
    private String doodleBaseUrl;

    @Autowired
    DoodleEmailService(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public void createDoodleAndSendMails(DoodleTemplate dto) {
        log.info("--- Received doodle template: '{}'.", dto);
        DoodleResponse doodleResponse = createOnlineDoodle(dto);
        log.info("--- Got response: '{}'.", doodleResponse);

//        VelocityContext context = buildEmailTemplateContext(dto, doodleResponse);
//        StringWriter bodyWriter = new StringWriter();
//        Velocity.evaluate(context, bodyWriter, "errorTemplate", dto.getBody());
//
//        JavaMailSender mailSender = getSelectedMailSender(dto);
//        MimeMessage message = mailSender.createMimeMessage();
//        MimeMessageHelper helper = new MimeMessageHelper(message);
//        try {
//            helper.setTo(dto.getRecipients().split(";"));
//            helper.setText(bodyWriter.toString(), true);
//            helper.setSubject(composeSubject(dto));
//            log.info("--- Sending email message");
//            log.info("--- Recipients: {}", new Object[]{message.getRecipients(Message.RecipientType.TO)});
//            log.info("--- Body: {}", bodyWriter);
//        } catch (MessagingException e) {
//            throw new RuntimeException(e);
//        }
//
//        mailSender.send(message);
    }

    private DoodleResponse createOnlineDoodle(DoodleTemplate dto) {
        MultiValueMap<String, Object> params = new LinkedMultiValueMap<>();
        params.add("title", dto.getName());
        params.add("locName", dto.getLocation());
        params.add("initiatorAlias", dto.getInitiator());
        params.add("initiatorEmail", "gosuvigi@gmail.com");
        params.add("hidden", "false");
        params.add("ifNeedBe", "false");
        params.add("askAddress", "false");
        params.add("askEmail", "false");
        params.add("askPhone", "false");
        params.add("optionsMode", "dates");
        params.add("options[]", buildDoodleTime(dto));
        params.add("type", "DATE");

        ResponseEntity<DoodleResponse> responseEntity = restTemplate.postForEntity(String.format("%s/np/new-polls/", doodleBaseUrl),
                params, DoodleResponse.class);
        return responseEntity.getBody();
    }

    private String buildDoodleTime(DoodleTemplate dto) {
        if (dto.getMatchDate() == null) {
            return "";
        }
        LocalDateTime ldt = LocalDateTime.ofInstant(dto.getMatchDate().toInstant(), ZoneId.systemDefault());
        String doodleDate = ldt.format(DateTimeFormatter.ofPattern("yyyyMMdd"));
        String startHour = ldt.getHour() + "" + ldt.getMinute();
        String endHour = (ldt.getHour() + 1) + "" + ldt.getMinute();

        // time format looks like options[]:201408312000-201408312100
        return String.format("%s%s-%s%s", doodleDate, startHour, doodleDate, endHour);
    }

}
