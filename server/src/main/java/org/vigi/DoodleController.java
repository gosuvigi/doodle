package org.vigi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Needed solely for the React Router of the client application.
 *
 * Created by ratoico on 8/24/15 4:36 PM.
 */
@Controller
class DoodleController {

    @RequestMapping("/")
    String home() {
        return "index";
    }

    @RequestMapping("/players")
    String players() {
        return "index";
    }

    @RequestMapping("/players/{player}")
    String playerDetail(@PathVariable String player) {
        return "index";
    }

    @RequestMapping("/templates")
    String templates() {
        return "index";
    }

    @RequestMapping("/templates/{template}")
    String templateDetail(@PathVariable String template) {
        return "index";
    }
}
