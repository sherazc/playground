package com.sc.spring.domain;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "user_document", language = "")
public class User extends BaseEntity implements UserDetails {

    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private List<String> roleCodes;

    public User() {
    }

    public User(String id, String username, String password, String firstName, String lastName, List<String> roleCodes) {
        this.setId(id);
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.roleCodes = roleCodes;
    }

    @Override
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public List<Role> getAuthorities() {
        if (roleCodes == null || roleCodes.size() < 1) {
            return null;
        }
        List<Role> roles = new ArrayList<Role>();
        for (String roleCode : roleCodes) {
            Role role = Role.getAllRoles().get(roleCode);
            if (role != null) {
                roles.add(role);
            }
        }

        return roles;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public List<String> getRoleCodes() {
        return roleCodes;
    }

    public void setRoleCodes(List<String> roleCodes) {
        this.roleCodes = roleCodes;
    }

    /*
    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }

    public String[] getRoleCodes() {
        String[] roleCodes = null;
        if (getRoles() != null && getRoles().size() > 0) {
            roleCodes = new String[getRoles().size()];
            for (int i = 0; i < getRoles().size(); i++) {
                roleCodes[i] = getRoles().get(i).getCode();
            }
        }
        return roleCodes;
    }

    public void setRoleCodes(String[] roleCodes) {
        setRoles(new ArrayList<Role>());
        if (roleCodes == null || roleCodes.length < 1) {
          return;
        }

        for (String roleCode : roleCodes) {
            Role role = Role.getAllRoles().get(roleCode);
            if (role != null) {
                getRoles().add(role);
            }
        }
    }*/
}
