package com.sc.spring.fileupload;

import com.sc.spring.fileupload.web.domain.WebResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

@Controller
public class FileUploadController01 {

    @RequestMapping({"/", "/index"})
    public ModelAndView indexPage() {
        ModelAndView modelAndView = new ModelAndView("index");
        return modelAndView;
    }

    @RequestMapping({"/example01"})
    public String example01() {
        return "example01";
    }

    @RequestMapping(value = {"/example01-submit"}, method = RequestMethod.POST)
    public ModelAndView example01Submit(@RequestParam(value = "fileName", required = false) String fileName,
                                        @RequestParam(value = "multipartFile", required = false) MultipartFile multipartFile) {
        ModelAndView modelAndView = new ModelAndView("confirmation-page");

        System.out.println(fileName);
        System.out.println(multipartFile);
        return modelAndView;
    }

    @RequestMapping({"/example02"})
    public String example02() {
        return "example02";
    }

    @RequestMapping(value = {"/example02-submit"}, method = RequestMethod.POST)
    public
    @ResponseBody
    WebResponse example02Submit(@RequestParam(value = "fileName", required = false) String fileName,
                                @RequestParam(value = "multipartFile", required = false) MultipartFile multipartFile) {
        System.out.println(fileName);
        System.out.println(multipartFile);
        WebResponse webResponse = new WebResponse();
        // webResponse.setMsg("Filename: " + fileName + " multipartFile:" + multipartFile);
        webResponse.setMsg("Testing");
        webResponse.setSuccess(true);
        return webResponse;
    }

    @RequestMapping({"/example03"})
    public String example03() {
        return "example03";
    }


    @RequestMapping(value = {"/example03-submit"}, method = RequestMethod.POST)
    public
    @ResponseBody
    WebResponse example03Submit(
            HttpServletRequest request,
            @RequestParam(value = "fileName", required = false) String fileName) {

        StringBuilder result = new StringBuilder();
        try {
            BufferedReader bufferedReader = new BufferedReader((new InputStreamReader(request.getInputStream())));
            String line;
            while ((line = bufferedReader.readLine()) != null) {
                result.append(line);
                result.append("<br/>");
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        System.out.println(result);

        WebResponse webResponse = new WebResponse();
        webResponse.setMsg(result.toString());
        webResponse.setSuccess(true);
        return webResponse;
    }
}
