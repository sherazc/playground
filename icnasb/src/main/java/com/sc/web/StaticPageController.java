package com.sc.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/static")
public class StaticPageController {

    @RequestMapping("/{pageName}")
    public String goToPage(@PathVariable("pageName")String pageName) {
        return pageName;
    }
}
