package com.sc.cdb.webservices.security;

import com.sc.cdb.data.model.User;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = new User(
                "abc.xyz",
                "xyz.abc",
                "email@email.com",
                "$2a$04$n.Ys16qnCE1ICxVkSM4ECeYXQOFwFUBGzfHUjECeZ6zniY69AzgKS", // password
                "First",
                "Last",
                true,
                new String[]{"USER"}
        );

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                true, true, true, true,
                AuthorityUtils.createAuthorityList(user.getRoles())
        );

        return userDetails;
    }
}
