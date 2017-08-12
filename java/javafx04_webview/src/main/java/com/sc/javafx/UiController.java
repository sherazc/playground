package com.sc.javafx;

import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.web.WebView;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

public class UiController implements Initializable {

    public static final String DEFAULT_EXTERNAL_LINK_STYLE = "cursor:pointer;text-decoration:underline;color:dodgerblue;font-size:16px";
    public static final int REPEAT = 100;

    @FXML
    private WebView webViewLogs;

    private WebViewLogsHandler webViewLogsHandler;

    private List<String> testFiles;

    public UiController() {
        testFiles = new ArrayList<>();
        testFiles.add(getFilePath("./test_files/1.jpeg"));
        testFiles.add(getFilePath("./test_files/2.png"));
        testFiles.add(getFilePath("./test_files/3.png"));
        testFiles.add(getFilePath("./test_files/4.html"));
        testFiles.add(getFilePath("./test_files/5.xml"));
        testFiles.add(getFilePath("./test_files/6.txt"));
    }

    private String getFilePath(String filePath) {
        try {
            return new File(filePath).getCanonicalPath().replaceAll("\\\\", "/");
        } catch (IOException e) {
            e.printStackTrace();
            return null;
        }
    }


    @FXML
    private void handleButtonText(ActionEvent event) {
        for (int i = 0; i < REPEAT; i++) {
            webViewLogsHandler.logMessage("Testing message: " + new Date(), null, true);
        }
    }

    @FXML
    private void handleButtonFile(ActionEvent event) {
        for (int i = 0; i < REPEAT; i++) {
            for (String testFile : testFiles) {
                webViewLogsHandler.logExternalUrlLink(testFile, testFile);
            }
        }
    }

    @FXML
    private void handleButtonFileOrImage(ActionEvent event) {
        for (int i = 0; i < REPEAT; i++) {
            for (String testFile : testFiles) {
                File file = new File(testFile);
                webViewLogsHandler.logExternalUrlLinkOrImage(file.toURI().toString(),
                        file.getAbsolutePath(), true, DEFAULT_EXTERNAL_LINK_STYLE,
                        true, 100, 100);
            }
        }
    }

    @FXML
    private void handleButtonURL(ActionEvent event) {
        for (int i = 0; i < REPEAT; i++) {
            webViewLogsHandler.logExternalUrlLink("www.google.com", "Google", true, DEFAULT_EXTERNAL_LINK_STYLE);
            webViewLogsHandler.logExternalUrlLink("https://news.google.com/", "https://news.google.com/", true, DEFAULT_EXTERNAL_LINK_STYLE);
        }
    }

    @FXML
    private void handleButtonImage(ActionEvent event) {
        for (int i = 0; i < REPEAT; i++) {
            webViewLogsHandler.logImageLink(new File(testFiles.get(0)).toURI().toString(), 100, 100, true);
            webViewLogsHandler.logImageLink(new File(testFiles.get(1)).toURI().toString(), 100, 100, true);
            webViewLogsHandler.logImageLink(new File(testFiles.get(2)).toURI().toString(), 100, 100, true);
        }
    }

    @FXML
    private void handleButtonClear(ActionEvent event) {
        webViewLogsHandler.clearWebView();
    }

    @FXML
    private void handleButtonDebug(ActionEvent event) {
        webViewLogsHandler.debugContent();
    }

    @FXML
    private void handleButtonHtml(ActionEvent event) {
        for (int i = 0; i < REPEAT; i++) {
            webViewLogsHandler.logHtml("<h3 style=\"color: cadetblue\">" + i + " Some H3 Heading</h3>\n" +
                    "<select>\n" +
                    "    <option>Item 1</option>\n" +
                    "    <option>Item 2</option>\n" +
                    "</select>\n" +
                    "<br/>\n" +
                    "<a href=\"www.example.org\">example.org</a>\n" +
                    "<hr/>");
        }

    }

    @Override
    public void initialize(URL location, ResourceBundle resources) {
        try {
            webViewLogsHandler = new WebViewLogsHandler(webViewLogs, "/logs_init.html");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
