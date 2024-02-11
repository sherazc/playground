package com.sc.sb.auth.config;

import com.sc.sb.auth.entity.ScUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class AuthenticatedUserDetail implements UserDetails {

    private final ScUser scUser;
    private final List<String> scRoles;

    public AuthenticatedUserDetail(ScUser scUser, List<String> scRoles) {
        this.scUser = scUser;
        this.scRoles = scRoles;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return scRoles.stream()
                .filter(Objects::nonNull)
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
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
