package com.sc.reminder.ws.controller;

import com.sc.reminder.api.domain.AyaDetail;
import com.sc.reminder.api.domain.Line;
import com.sc.reminder.api.domain.enums.SuraName;
import com.sc.reminder.api.service.SearchService;
import com.sc.reminder.ws.domain.ReminderDetail;
import com.sc.reminder.ws.services.ResourceSearchService;
import com.sc.reminder.ws.util.CommonUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Arrays;
import java.util.List;

@Controller
public class ReminderController {

    private static final int DEFAULT_AYAS_HISTORY = 0;
    private static final String DEFAULT_TRANSLATION = "English_-_Saheeh_International";

    @RequestMapping("/")
    public ModelAndView createServiceUrl(HttpServletRequest request,
                                         @RequestParam(defaultValue = "reminderCallBack", value = "callback", required = false) String callback,
                                         @RequestParam(defaultValue = "English - Saheeh International", value = "translation", required = false) String translation) {

        ModelAndView modelAndView = new ModelAndView("index");
        loadModalAttributes(modelAndView, callback, translation);

        modelAndView.addObject("serviceUrl", createReminderServiceUrl(request, callback, translation));
        request.setAttribute("serverUrl", CommonUtil.createServerUrl(request));
        return modelAndView;
    }

    @RequestMapping("/sample")
    public String createServiceUrl(HttpServletRequest request) {
        request.setAttribute("serverUrl", CommonUtil.createServerUrl(request));
        return "sample";
    }

    @RequestMapping(value="/reminder", produces = MediaType.APPLICATION_JSON_VALUE)
    public
    @ResponseBody
    ReminderDetail reminder(HttpServletResponse response,
            @RequestParam(defaultValue = "English - Saheeh International", value = "translation", required = false)
                             String translation) {

        response.setContentType("application/javascript");
        response.setCharacterEncoding("UTF-8");
        if (StringUtils.isBlank(translation)) {
            translation = DEFAULT_TRANSLATION;
        }
        SearchService searchService = new ResourceSearchService();
        searchService.setTranslationDisplayName(translation.replaceAll(" ", "_"));

        List<AyaDetail> ayaDetails = searchService.search(0);
        ReminderDetail reminderDetail = null;
        if (ayaDetails != null && ayaDetails.size() > 0) {
            AyaDetail ayaDetail = ayaDetails.get(0);
            reminderDetail = new ReminderDetail(ayaDetail, translation);
        }
        return reminderDetail;
    }

    @RequestMapping("/today")
    public ModelAndView todaysReminder(HttpServletRequest request,
                                       @RequestParam(defaultValue = "English - Saheeh International", value = "translation", required = false)
                                       String translation,
                                       @RequestParam(defaultValue = "true", value = "css", required = false)
                                       Boolean css) {

        ModelAndView modelAndView = new ModelAndView("todaysReminder");

        SearchService searchService = new ResourceSearchService();
        searchService.setTranslationDisplayName(translation.replaceAll(" ", "_"));

        List<AyaDetail> ayaDetails = searchService.search(DEFAULT_AYAS_HISTORY);

        if (ayaDetails != null && ayaDetails.size() > 0) {

            AyaDetail ayaDetail = ayaDetails.get(0);
            modelAndView.addObject("ayaDetail", ayaDetail);
            List<Line> ayas = ayaDetail.getAyas();

            if (ayas != null && ayas.size() > 0) {
                if (ayas.get(0).getSuraNumber() > 0) {
                    modelAndView.addObject("suraName", SuraName.findBySuraNumber(ayas.get(0).getSuraNumber()));
                }
            }
        }
        modelAndView.addObject("translation", translation);
        modelAndView.addObject("showCss", css);
        request.setAttribute("serverUrl", CommonUtil.createServerUrl(request));
        return modelAndView;
    }


    private String createReminderServiceUrl(HttpServletRequest request, String callback, String translation) {
        String serverUrl = CommonUtil.createServerUrl(request);
        return serverUrl + "/reminder?cb=" + callback + "&translation=" + translation;
    }

    private void loadModalAttributes(ModelAndView modelAndView, String callback, String translation) {
        modelAndView.addObject("callback", callback);
        modelAndView.addObject("translation", translation);

        modelAndView.addObject("translationNames", Arrays.asList(
                "Bengali - Muhiuddin Khan",
                "Bengali - Zohurul Hoque",
                "English - Abdullah Yusuf Ali",
                "English - Ahmed Raza Khan",
                "English - Saheeh International",
                "French - Muhammad Hamidullah",
                "German - Abu Rida Muhammad ibn Ahmad ibn Rassoul",
                "Hindi - Muhammad Farooq Khan and Muhammad Ahmed",
                "Hindi - Suhel Farooq Khan and Saifur Rahman Nadwi",
                "Indonesian - Indonesian Ministry of Religious Affairs",
                "Persian - Mahdi Elahi Ghomshei",
                "Spanish - Muhammad Isa Garcia",
                "Urdu - Abul Aala Maududi",
                "Urdu - Ahmed Raza Khan",
                "Urdu - Fateh Muhammad Jalandhry"
        ));
    }


}