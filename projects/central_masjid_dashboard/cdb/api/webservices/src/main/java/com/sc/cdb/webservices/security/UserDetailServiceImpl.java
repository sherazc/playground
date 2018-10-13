package com.sc.cdb.webservices.security;

import com.sc.cdb.services.UserService;
import com.sc.cdb.webservices.model.AuthenticatedUserDetail;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private UserService userService;

    public UserDetailServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return this.userService
                .findUserByEmail(email)
                .map(AuthenticatedUserDetail::new)
                .orElse(null);
    }
}
