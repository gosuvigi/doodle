package org.vigi;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * Created by ratoico on 8/24/15 4:36 PM.
 */
@Controller
class DoodleController {

    @RequestMapping("/")
    String home() {
        return "index";
    }

    private List<DoodleTemplate> templates;

    @PostConstruct
    void init() {
        DoodleTemplate dt1 = DoodleTemplate.builder()
                .id(1L)
                .dateTime(new Date())
                .emailText("text 1")
                .initiator("hodor 1")
                .location("the wall")
                .name("indoor")
                .title("football indoor")
                .recipient(Person.builder().id(666L).firstName("gogu").email("gogu@gogu.com").build())
                .recipient(Person.builder().id(667L).firstName("hodor").email("hodor@hodor.com").build())
                .build();
        DoodleTemplate dt2 = DoodleTemplate.builder()
                .id(2L)
                .dateTime(new Date())
                .emailText("please come before 20:50")
                .initiator("hodor 2")
                .location("vub")
                .name("outdoor")
                .title("football outdoor")
                .recipient(Person.builder().firstName("gogu").email("gogu@gogu.com").build())
                .recipient(Person.builder().firstName("hodor").email("hodor@hodor.com").build())
                .build();
        templates = Collections.unmodifiableList(Arrays.asList(dt1, dt2));
    }

    @RequestMapping(value = "/templates", method = RequestMethod.GET, produces = "application/json")
    ResponseEntity getAllTemplates() {
        return ResponseEntity.ok(templates);
    }

    @RequestMapping("/players")
    String players() {
        return "index";
    }

    @RequestMapping("/players/{player}")
    String playerDetail(@PathVariable String player) {
        return "index";
    }
}
