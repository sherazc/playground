package com.sc.reminder.ws.controller;

import com.sc.reminder.ws.util.CommonUtil;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class StaticController {

    @RequestMapping("/static/{viewName}")
    public ModelAndView staticPage(
            @PathVariable("viewName") String viewName,
            HttpServletRequest request,
            HttpServletResponse response) {
        ModelAndView modelAndView = new ModelAndView("/static/" + viewName);
        request.setAttribute("serverUrl", CommonUtil.createServerUrl(request));
        return modelAndView;
    }
}
