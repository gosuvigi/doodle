package org.vigi;

import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by vigi on 3/20/2016.
 */
@Service
class DoodleTemplateService {

    private final List<DoodleTemplate> templates;

    DoodleTemplateService() {
        templates = initTemplates();
    }

    private List<DoodleTemplate> initTemplates() {
        DoodleTemplate dt1 = DoodleTemplate.builder()
                .id(1L)
                .dateTime(new Date())
                .emailText("text 1")
                .initiator("hodor 1")
                .location("the wall")
                .name("indoor")
                .title("football indoor")
                .recipient(Player.builder().id(666L).name("gogu").email("gogu@gogu.com").build())
                .recipient(Player.builder().id(667L).name("hodor").email("hodor@hodor.com").build())
                .build();
        DoodleTemplate dt2 = DoodleTemplate.builder()
                .id(2L)
                .dateTime(new Date())
                .emailText("please come before 20:50")
                .initiator("hodor 2")
                .location("vub")
                .name("outdoor")
                .title("football outdoor")
                .recipient(Player.builder().name("gogu").email("gogu@gogu.com").build())
                .recipient(Player.builder().name("hodor").email("hodor@hodor.com").build())
                .build();
        return Collections.unmodifiableList(Arrays.asList(dt1, dt2));
    }

    List<DoodleTemplate> getAllTemplates() {
        return templates;
    }

    DoodleTemplate getTemplate(Long templateId) {
        Optional<DoodleTemplate> optional = templates.stream()
                .filter(dt -> dt.getId().equals(templateId))
                .findFirst();
        if (optional.isPresent()) {
            return optional.get();
        }
        throw new IllegalArgumentException(String.format("Doodle template with id: '%s' cannot be found.", templateId));
    }
}
