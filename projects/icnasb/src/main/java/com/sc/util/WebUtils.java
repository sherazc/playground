package com.sc.util;

import com.sc.domain.Book;
import com.sc.domain.User;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.text.SimpleDateFormat;

public class WebUtils {

    public static final SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy_MM_dd_H_mm_ss");
    private static String SPECIAL_CHAR_PATTERN = "[^a-zA-Z]";

    public static User loggedInUser() {
        User user = null;

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            return null;
        }

        Object principal = authentication.getPrincipal();
        if (principal instanceof User) {
            user = (User) principal;
        }

        return user;
    }


    public static String makeBookUniqueCollectionName(Book book) {
        StringBuilder result = new StringBuilder();
        result.append(book.getUserId()).append("__");
        result.append(simpleDateFormat.format(book.getUploadedDate())).append("__");
        result.append(convertDbFriendlyString(book.getClientFileName()));
        return result.toString();
    }


    public static String convertDbFriendlyString(String string) {
        if (StringUtils.isBlank(string)) {
            return "";
        }
        String convertString = StringUtils.replace(string, " ", "_");
        convertString = StringUtils.replace(convertString, ".", "_");
        return convertString;
    }

    public static String cleanupWordSpecialCharacters(String word) {
        if (StringUtils.isBlank(word)) {
            return word;
        }
        return word.replaceAll(SPECIAL_CHAR_PATTERN, "");
    }
}
