package com.sc.reminder.ws.util;

import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.io.InputStream;

/**
 * Created by sheraz on 11/7/15.
 */
public class CommonUtil {

    public static final InputStream openResourceInputStream(String resourceName) {
        InputStream inputStream = null;
        try {
            inputStream = CommonUtil.class.getResourceAsStream(resourceName);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return inputStream;
    }


    public static String createServerUrl(HttpServletRequest request) {
        StringBuilder serverUrl = new StringBuilder("http://");
        serverUrl.append(request.getServerName());
        if (request.getServerPort() != 80) {
            serverUrl.append(":").append(request.getServerPort());
        }
        if (StringUtils.isNotBlank(request.getContextPath())) {
            serverUrl.append(request.getContextPath());
        }
        return serverUrl.toString();
    }
}
