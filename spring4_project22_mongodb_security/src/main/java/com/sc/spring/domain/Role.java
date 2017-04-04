package com.sc.spring.domain;

import org.springframework.security.core.GrantedAuthority;

import java.util.HashMap;
import java.util.Map;

public class Role implements GrantedAuthority {

    private static Map<String, Role> allRoles;

    static {
        allRoles = new HashMap<String, Role>();
        allRoles.put("ROLE_USER", new Role("ROLE_USER", "User Role", "User Role Description"));
        allRoles.put("ROLE_ADMIN", new Role("ROLE_ADMIN", "Admin Role", "Admin Role Description"));
    }

    private String code;
    private String name;
    private String description;

    private Role(String code, String name, String description) {
        this.code = code;
        this.name = name;
        this.description = description;
    }

    public static Map<String, Role> getAllRoles() {
        return allRoles;
    }

    public String getCode() {
        return code;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String getAuthority() {
        return getCode();
    }

    @Override
    public String toString() {
        return this.getName();
    }
}
