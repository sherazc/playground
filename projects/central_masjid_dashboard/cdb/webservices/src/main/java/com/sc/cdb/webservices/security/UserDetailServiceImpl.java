package com.sc.cdb.webservices.security;

import com.sc.cdb.data.model.User;
import com.sc.cdb.services.UserService;
import com.sc.cdb.webservices.model.AuthenticatedUserDetail;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
public class UserDetailServiceImpl implements UserDetailsService {
    private UserService userService;

    public UserDetailServiceImpl(UserService userService) {
        this.userService = userService;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
/*

        // TODO: Load user from database

        User user = new User(
                "abc.xyz",
                "xyz.abc",
                "email@email.com",
                "$2a$04$bl.8O/fUKciwtqKeMg8g.Ox/OGlEqleAgQq9Zuo5/HPPHhM8aLocG", // password
                "First",
                "Last",
                true,
                Arrays.asList("USER")
        );

        String[] roles = user.getRoles().stream()
                .map(e -> "ROLE_" + e).toArray(String[]::new);


        // TODO Create my own UserDetail implementation
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                true, true, true, true,
                AuthorityUtils.createAuthorityList(roles)
        );

        return userDetails;
        */

        Optional<User> optionalUser = this.userService.findUserByEmail(email);

        return optionalUser.map(AuthenticatedUserDetail::new).orElse(null);
    }
}
