package com.sc.web;

import com.sc.dao.BookDao;
import com.sc.domain.Book;
import com.sc.domain.User;
import com.sc.domain.WebStatusResponse;
import com.sc.io.FileService;
import com.sc.services.BookService;
import com.sc.util.WebUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.inject.Inject;
import javax.inject.Named;
import javax.servlet.http.HttpServletRequest;
import java.io.File;
import java.util.Arrays;

@Controller
@RequestMapping("/user-listing")
@PreAuthorize("isAuthenticated()")
public class UserListingController {

    private static final Logger LOG = LoggerFactory.getLogger(UserListingController.class);

    @Inject
    @Named("fileService")
    private FileService fileService;

    @Inject
    @Named("bookDao")
    private BookDao bookDao;

    @Inject
    @Named("bookService")
    private BookService bookService;

    @RequestMapping("")
    public ModelAndView userListing() {
        LOG.debug("User listing.");
        ModelAndView model = new ModelAndView("user-listing");
        User user = WebUtils.loggedInUser();
        if (user != null && StringUtils.isNotBlank(user.getId())) {
            model.addObject(
                    "books",
                    bookDao.findByUserIdAndProcessStatus(user.getId(), null)
            );
        }
        return model;
    }

    @RequestMapping("processed-documents")
    public ModelAndView processedDocuments() {
        ModelAndView model = new ModelAndView("processed-documents");
        User user = WebUtils.loggedInUser();
        if (user != null && StringUtils.isNotBlank(user.getId())) {

            model.addObject(
                    "books",
                    bookDao.findByUserIdAndProcessStatus(user.getId(), Arrays.asList(Book.ProcessStatus.SUCCESSFULLY_PROCESSED))
            );
        }
        return model;
    }

    @RequestMapping("/upload-document")
    public String uploadBook() {
        return "upload-document";
    }

    @RequestMapping("/upload-document/submit")
    public
    @ResponseBody
    WebStatusResponse uploadBookSubmit(HttpServletRequest request, @RequestParam String fileName) {
        WebStatusResponse webResponse = new WebStatusResponse();

        User user = WebUtils.loggedInUser();
        if (user == null) {
            webResponse.setMessage("Logged-in User is not authenticated.");
            webResponse.setSuccessful(false);
            return webResponse;
        }

        if (StringUtils.length(fileName) > FileService.FILE_NAME_LENGTH) {
            webResponse.setMessage("File mame can not be longer than " + FileService.FILE_NAME_LENGTH + " characters.");
            webResponse.setSuccessful(false);
            return webResponse;
        }

        try {
            String outputFileName = fileService.inputToOutputFileName(user.getId(), fileName);
            boolean uploadSuccessful = fileService.writeInputStreamToFile(request.getInputStream(), outputFileName);
            webResponse.setSuccessful(uploadSuccessful);
            if (uploadSuccessful) {
                webResponse.setMessage("Uploaded " + fileName + ".");
                webResponse.setSuccessful(true);
                webResponse.getParameters().put("serverFileName", new File(outputFileName).getName());
            } else {
                webResponse.setMessage("Upload Failed.");
                webResponse.setSuccessful(false);
            }
        } catch (Exception e) {
            e.printStackTrace();
            LOG.error("Failed to read request stream.", e);
            webResponse.setSuccessful(false);
            webResponse.setMessage("Upload Failed.");
        }
        return webResponse;
    }


    @RequestMapping(value = "/submit-document", method = RequestMethod.POST)
    public ModelAndView submitDocument(@RequestParam String documentName, @RequestParam String documentDescription,
                                       @RequestParam String serverFileName) {
        ModelAndView modelAndView = new ModelAndView("upload-document");
        Book book = new Book();
        book.setDocumentName(documentName);
        book.setDocumentDescription(documentDescription);
        book.setServerFileName(serverFileName);
        book.setProcessStatus(Book.ProcessStatus.NOT_PROCESSED);
        book.setWordCollectionName(WebUtils.makeBookUniqueCollectionName(book));
        bookDao.insert(book);
        return modelAndView;
    }

    @RequestMapping(value = "/unprocessed-documents", method = RequestMethod.GET)
    public ModelAndView unprocessedDocuments() {
        ModelAndView modelAndView = new ModelAndView("unprocessed-documents");
        User user = WebUtils.loggedInUser();
        if (user != null && StringUtils.isNotBlank(user.getId())) {
            modelAndView.addObject(
                    "books",
                    bookDao.findByUserIdAndProcessStatus(user.getId(),
                            Arrays.asList(Book.ProcessStatus.NOT_PROCESSED, Book.ProcessStatus.PROCESSING))
            );
        }
        return modelAndView;
    }

    @RequestMapping("/delete-document")
    public String deleteDocument(@RequestParam String id, @RequestParam String redirect) {
        bookService.deleteFromDbAndResourceByBookId(id);
        return "redirect:/user-listing/" + redirect;
    }

    @RequestMapping("/process-document")
    public
    @ResponseBody
    WebStatusResponse processDocument(@RequestParam String id) {
        WebStatusResponse webResponse = new WebStatusResponse();
        boolean processStarted = bookService.processDocument(id);
        webResponse.setSuccessful(processStarted);
        return webResponse;
    }
}
