package com.sc.spring.jsonp.utils;

import com.sc.spring.jsonp.domain.Employee;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.Date;

/**
 * Created by sheraz on 11/13/15.
 */
public class CommonUtils {


    public static Employee createNewEmployee(int seed) {
        return new Employee(
                100L + seed,
                "name_" + seed,
                Arrays.asList("Dept1_" + seed, "Dept2_" + seed, "Dept3_" + seed),
                1000D + seed,
                new Date()
        );
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
