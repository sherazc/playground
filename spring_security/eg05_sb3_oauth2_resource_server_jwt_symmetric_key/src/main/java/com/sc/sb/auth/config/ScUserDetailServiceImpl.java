package com.sc.sb.auth.config;

import com.sc.sb.auth.entity.ScUser;
import com.sc.sb.auth.repository.ScUserRepository;
import com.sc.sb.auth.repository.ScUserRoleRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * When the user login, this service is responsible for loading UserDetails/ScUserDetails
 * The loaded UserDetails/ScUserDetails will be used by SpringSecurity to check if the request's
 * username/password and authorities authenticates for user to access the resources.
 *
 *  Uses database to load users & roles
 *
 */
@Service
public class ScUserDetailServiceImpl implements UserDetailsService {

    private final ScUserRepository scUserRepository;
    private final ScUserRoleRepository scUserRoleRepository;

    public ScUserDetailServiceImpl(ScUserRepository scUserRepository, ScUserRoleRepository scUserRoleRepository) {
        this.scUserRepository = scUserRepository;
        this.scUserRoleRepository = scUserRoleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<ScUser> scUser = scUserRepository.findByUserNameIgnoreCase(username);

        /*

         */

        List<String> scRolesName = scUser.map(ScUser::getId)
                .map(scUserRoleRepository::findScRolesByScUserId)
                .orElse(List.of());

        return scUser
                .map(u -> new ScUserDetail(u, scRolesName))
                .orElseThrow(() -> new UsernameNotFoundException("Can not find user: " + username));
    }
}
