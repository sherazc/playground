package com.sc.cdb.webservices.security;

import com.sc.cdb.data.model.User;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        // TODO: Load user from database
        User user = new User(
                "abc.xyz",
                "xyz.abc",
                "email@email.com",
                "$2a$04$bl.8O/fUKciwtqKeMg8g.Ox/OGlEqleAgQq9Zuo5/HPPHhM8aLocG", // password
                "First",
                "Last",
                true,
                new String[]{"USER"}
        );

        String[] roles = Arrays.stream(user.getRoles())
                .map(e -> "ROLE_" + e).toArray(String[]::new);

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                true, true, true, true,
                AuthorityUtils.createAuthorityList(roles)
        );

        return userDetails;
    }
}
