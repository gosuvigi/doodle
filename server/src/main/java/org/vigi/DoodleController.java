package org.vigi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.PostConstruct;
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
