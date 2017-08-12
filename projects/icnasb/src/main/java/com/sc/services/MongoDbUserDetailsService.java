package com.sc.services;

import com.sc.dao.UserDao;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import javax.inject.Inject;
import javax.inject.Named;

@Component("mongoDbUserDetailsService")
public class MongoDbUserDetailsService implements UserDetailsService {

    @Inject
    @Named("userDao")
    private UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (StringUtils.isBlank(username)) {
            return null;
        }
        return userDao.findByUsername(username);
    }
}
