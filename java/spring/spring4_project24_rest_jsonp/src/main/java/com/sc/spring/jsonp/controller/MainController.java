package com.sc.spring.jsonp.controller;

import com.sc.spring.jsonp.domain.Employee;
import com.sc.spring.jsonp.utils.CommonUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Controller
public class MainController {

    @RequestMapping(value = {"/", "/index"})
    public String home() {
        return "index";
    }

    @RequestMapping(value = "/simpleJSON")
    public
    @ResponseBody
    Employee simpleJson() {
        return CommonUtils.createNewEmployee(500);
    }

    @RequestMapping(value = "/simpleJSONP", produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    Employee simpleJsonP() {
        return CommonUtils.createNewEmployee(600);
    }

    @RequestMapping("/static/{viewName}")
    public ModelAndView staticPage(
            @PathVariable("viewName") String viewName,
            HttpServletRequest request,
            HttpServletResponse response) {
        ModelAndView modelAndView = new ModelAndView("/static/" + viewName);
        request.setAttribute("serverUrl", CommonUtils.createServerUrl(request));
        return modelAndView;
    }
}