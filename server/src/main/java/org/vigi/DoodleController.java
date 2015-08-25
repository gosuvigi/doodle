package org.vigi;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by ratoico on 8/24/15 4:36 PM.
 */
@Controller
public class DoodleController {

    @RequestMapping("/")
    public String home() {
        return "index";
    }
}
