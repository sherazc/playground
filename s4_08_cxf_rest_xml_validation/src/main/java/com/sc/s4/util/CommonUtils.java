package com.sc.s4.util;

import com.sc.schema.company.ObjectFactory;
import org.apache.commons.lang3.StringUtils;

public class CommonUtils {

    public static final com.sc.schema.company.ObjectFactory OF_COMPANY = new com.sc.schema.company.ObjectFactory();
    public static final com.sc.schema.common.ObjectFactory OF_COMMON = new com.sc.schema.common.ObjectFactory();
    public static final com.sc.schema.store.ObjectFactory OF_STORE = new com.sc.schema.store.ObjectFactory();

    public static Integer touchInteger(Integer number) {
        if (number == null) {
            return 0;
        } else {
            return number;
        }
    }

    public static Long touchLong(Long number) {
        if (number == null) {
            return 0L;
        } else {
            return number;
        }
    }

    public static String touchString(String string) {
        if (StringUtils.isBlank(string)) {
            return "";
        } else {
            return string;
        }
    }
}
