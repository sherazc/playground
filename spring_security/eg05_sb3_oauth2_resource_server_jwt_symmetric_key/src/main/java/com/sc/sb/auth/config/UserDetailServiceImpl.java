package com.sc.sb.auth.config;

import com.sc.sb.auth.repository.ScUserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final ScUserRepository scUserRepository;

    public UserDetailServiceImpl(ScUserRepository scUserRepository) {
        this.scUserRepository = scUserRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return scUserRepository.findByUserNameIgnoreCase(username)
                .map(AuthenticatedUserDetail::new)
                .orElseThrow(() -> new UsernameNotFoundException("Can not find user: " + username));
    }
}
