package com.sc.ui.services;

import com.sc.app.Main;
import com.sun.deploy.uitoolkit.impl.fx.HostServicesFactory;
import com.sun.javafx.application.HostServicesDelegate;
import javafx.scene.web.WebEngine;
import javafx.scene.web.WebView;
import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.events.EventListener;
import org.w3c.dom.events.EventTarget;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.StringWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class WebViewLogsHandler {

    public static final String DEFAULT_EXTERNAL_LINK_STYLE = "cursor:pointer;text-decoration:underline;color:seagreen;font-size:16px";

    private static final String LISTENER_NAME_SRC_SHOW_DOCUMENT = "srcShowDocument";
    private static final String DEFAULT_IMAGE_STYLE = "cursor:pointer;";

    private String initHtmlFileName;
    private WebEngine webEngine;
    private Element elementMainContent;
    private Document document;
    private Map<String, EventListener> listenerMap;
    private static final List<String> IMAGE_FILE_TYPES = Arrays.asList("jpg", "jpeg", "png", "bmp");

    public WebViewLogsHandler(WebView webView, String initHtmlFileName) throws Exception {
        webEngine = webView.getEngine();
        this.initHtmlFileName = initHtmlFileName;
        clearWebView();
        listenerMap = createListeners();
    }

    public void logHtml(String html) {
        webEngine.executeScript("$(\"#content\").append(\"" + cleanExtraSpaces(html) + "\")");
    }

    public void logMessage(String message, String style, boolean lineBreak) {
        Map<String, String> attributes = null;
        if (StringUtils.isNotBlank(style)) {
            attributes = new HashMap<>();
            attributes.put("style", DEFAULT_IMAGE_STYLE);
        }
        getElementMainContent().appendChild(createElement("span", message, attributes));
        appendLineBreak(lineBreak);
    }

    public void logImageLink(String path, int width, int height, boolean lineBreak) {
        if (StringUtils.isBlank(path)) {
            return;
        }
        Map<String, String> attributes = new HashMap<>();
        attributes.put("src", path);
        attributes.put("width", "" + width);
        attributes.put("height", "" + height);
        attributes.put("style", DEFAULT_IMAGE_STYLE);

        Element element = createElement("img", null, attributes);
        ((EventTarget) element).addEventListener("click", listenerMap.get(LISTENER_NAME_SRC_SHOW_DOCUMENT), false);
        getElementMainContent().appendChild(element);
        appendLineBreak(lineBreak);
    }

    public void logExternalUrlLink(String path, String value) {
        logExternalUrlLink(path, value, true, DEFAULT_EXTERNAL_LINK_STYLE);
    }

    public void logExternalUrlLink(String path, String value, boolean lineBreak, String style) {
        Map<String, String> attributes = new HashMap<>();
        if (StringUtils.isNotBlank(style)) {
            attributes.put("style", style);
        }
        attributes.put("src", path);
        Element element = createElement("ext-url", value, attributes);
        ((EventTarget) element).addEventListener("click", listenerMap.get(LISTENER_NAME_SRC_SHOW_DOCUMENT), false);
        getElementMainContent().appendChild(element);
        appendLineBreak(lineBreak);
    }

    public void logExternalUrlLinkOrImage(String path, String value, boolean lineBreak, String style,
                                          boolean showImage, int width, int height) {
        if (showImage && isImage(path)) {
            logImageLink(path, width, height, lineBreak);
        } else {
            logExternalUrlLink(path, value, lineBreak, style);
        }
    }

    private void appendLineBreak(boolean lineBreak) {
        if (lineBreak) {
            getElementMainContent().appendChild(getDocument().createElement("br"));
        }
    }

    private Element createElement(String tagName, String value, Map<String, String> attributes) {
        Element element = getDocument().createElement(tagName);
        if (StringUtils.isNotBlank(value)) {
            element.setTextContent(value);
        }
        if (attributes != null) {
            for (String attributeName : attributes.keySet()) {
                element.setAttribute(attributeName, attributes.get(attributeName));
            }
        }
        return element;
    }

    private Map<String, EventListener> createListeners() {
        Map<String, EventListener> listenerMap = new HashMap<>();
        HostServicesDelegate hostServicesDelegate = HostServicesFactory.getInstance(Main.application);
        listenerMap.put(LISTENER_NAME_SRC_SHOW_DOCUMENT, event -> {
            Element target = (Element) event.getTarget();
            hostServicesDelegate.showDocument(target.getAttribute("src"));
        });
        return listenerMap;
    }

    public Document getDocument() {
        if (document == null) {
            document = webEngine.getDocument();
        }
        return document;
    }

    private Element getElementMainContent() {
        if (elementMainContent == null) {
            elementMainContent = getDocument().getElementById("content");
        }
        return elementMainContent;
    }

    public void debugContent() {
        prettyPrintXml(getDocument());
    }

    public void clearWebView() {
        elementMainContent = null;
        document = null;
        webEngine.load(getClass().getResource(initHtmlFileName).toExternalForm());
    }

    private static void prettyPrintXml(Node node) {
        try {
            Transformer transformer = TransformerFactory.newInstance().newTransformer();
            transformer.setOutputProperty(OutputKeys.INDENT, "yes");
            StreamResult result = new StreamResult(new StringWriter());
            DOMSource source = new DOMSource(node);
            transformer.transform(source, result);
            String xmlString = result.getWriter().toString();
            System.out.println(xmlString);
        } catch (TransformerException e) {
            e.printStackTrace();
        }
    }

    private static String cleanExtraSpaces(String text) {
        if (text == null) {
            return "";
        } else {
//            return text.replaceAll("\n", "").replaceAll("\r", "").replaceAll("\"", "\\\\\"")
//                    .replaceAll("\'", "\\\\\'").replaceAll("  ", "");
            return StringUtils.replaceEach(text,
                    new String[]{"\n", "\r", "\"", "\'", "  "},
                    new String[]{"", "", "\\\"", "\\\'", ""});

        }
    }

    private static boolean isImage(String filePath) {
        boolean result = false;
        for (String imageFileType : IMAGE_FILE_TYPES) {
            if (result = StringUtils.endsWithIgnoreCase(filePath, imageFileType)) {
                break;
            }
        }
        return result;
    }
}
