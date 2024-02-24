package com.sc.sb.auth.config;

import com.sc.sb.auth.entity.ScUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

/**
 * DTO Object used by Spring Security. When authenticating in Spring Security uses this DTO to get users:
 * - Active,
 * - Roles/Authorities
 * - Password
 * - Any other custom data
 *
 * org.springframework.security.core.userdetails.UserDetails is used to create
 * org.springframework.security.core.Authentication
 *
 * Authentication is the main Object that is used by Spring Security's Security Context.
 *
 * Authentication Object can be DI. It contains current user's:
 * - Username
 * - is authenticated
 * - password
 * - Roles/Authorities
 */
public class ScUserDetail implements UserDetails {

    private final ScUser scUser;
    private final List<String> scRoles;

    public ScUserDetail(ScUser scUser, List<String> scRoles) {
        this.scUser = scUser;
        this.scRoles = scRoles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return scRoles.stream()
                .filter(Objects::nonNull)
                .map(SimpleGrantedAuthority::new)
                .toList();
    }

    @Override
    public String getPassword() {
        return scUser.getUserPassword();
    }

    @Override
    public String getUsername() {
        return scUser.getUserName();
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
}
