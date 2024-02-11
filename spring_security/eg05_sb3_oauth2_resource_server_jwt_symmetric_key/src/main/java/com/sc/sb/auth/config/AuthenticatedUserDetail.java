package com.sc.sb.auth.config;

import com.sc.sb.auth.entity.ScRole;
import com.sc.sb.auth.entity.ScUser;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Objects;
import java.util.stream.Collectors;

public class AuthenticatedUserDetail implements UserDetails {

    private final ScUser scUser;

    public AuthenticatedUserDetail(ScUser scUser) {
        this.scUser = scUser;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return scUser.getScRoles().stream()
                .map(ScRole::getRoleName)
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
