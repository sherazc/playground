package com.sc.spring.fileupload;

import com.sc.spring.fileupload.util.WebUtils;
import com.sc.spring.fileupload.web.domain.WebResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.List;

@Controller
public class FileUploadController02 {

    @Value("${upload.directory}")
    private String uploadDirectoryName;

    @RequestMapping("/example04")
    public String example04() {
        return "example04";
    }

    @RequestMapping("/example04-submit")
    public
    @ResponseBody
    WebResponse example04Submit(HttpServletRequest request, @RequestParam String fileName) {
        WebResponse webResponse = new WebResponse();
        try {
            byte[] buffer = WebUtils.inputStreamToBytes(request.getInputStream());
            System.out.println(buffer);
            System.out.println(buffer.length);
            webResponse.setMsg("Upload Successful.");
        } catch (Exception e) {
            e.printStackTrace();
            webResponse.setMsg("Upload Failed.");
        }
        if (System.currentTimeMillis() % 2 == 0) {
            throw new RuntimeException("System.currentTimeMillis() % 2 == 0 is true");
        }

        return webResponse;
    }

    @RequestMapping("/example05")
    public String example05() {
        return "example05";
    }

    @RequestMapping("/example05-submit")
    public
    @ResponseBody
    WebResponse example05Submit(HttpServletRequest request, @RequestParam String fileName) {
        WebResponse webResponse = new WebResponse();
        try {
            String outputFileName = WebUtils.inputToOutputFileName(uploadDirectoryName, fileName);
            boolean uploadSuccessful = WebUtils.writeInputStreamToFile(request.getInputStream(), outputFileName);
            webResponse.setSuccess(uploadSuccessful);
            if (uploadSuccessful) {
                webResponse.setMsg("Upload Successful.");
            } else {
                webResponse.setMsg("Upload Failed.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Failed to read request stream.");
            webResponse.setSuccess(false);
            webResponse.setMsg("Upload Failed.");
        }
        return webResponse;
    }

    @RequestMapping("/example06")
    public ModelAndView example06(@RequestParam(required = false) String tag) {
        ModelAndView modelAndView = new ModelAndView("example06");
        List<File> files = WebUtils.listFiles(uploadDirectoryName, tag);
        modelAndView.addObject("files", files);
        modelAndView.addObject("tag", tag);
        return modelAndView;
    }

    @RequestMapping("/example06delete")
    public ModelAndView example06delete(@RequestParam(required = false) String tag,
                                  @RequestParam(required = true,value = "file-name") String fileName) {
        File fileToDelete = new File(uploadDirectoryName + "/" + fileName);
        if (fileToDelete.exists()) {
            fileToDelete.delete();
        }
        return example06(tag);
    }
}
