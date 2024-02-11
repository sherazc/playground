package com.sc.sb.auth.config;

import com.sc.sb.auth.entity.ScRole;
import com.sc.sb.auth.entity.ScUser;
import com.sc.sb.auth.entity.ScUserRole;
import com.sc.sb.auth.repository.ScUserRepository;
import com.sc.sb.auth.repository.ScUserRoleRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserDetailServiceImpl implements UserDetailsService {

    private final ScUserRepository scUserRepository;
    private final ScUserRoleRepository scUserRoleRepository;

    public UserDetailServiceImpl(ScUserRepository scUserRepository, ScUserRoleRepository scUserRoleRepository) {
        this.scUserRepository = scUserRepository;
        this.scUserRoleRepository = scUserRoleRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<ScUser> scUser = scUserRepository.findByUserNameIgnoreCase(username);

        List<ScUserRole> scUserRoles = scUser.map(ScUser::getId)
                .map(scUserRoleRepository::findByScUser_Id)
                .orElse(List.of());

        List<ScRole> scRoles = scUserRoles.stream()
                .map(ScUserRole::getScRole)
                .toList();

        return scUser
                .map(u -> new AuthenticatedUserDetail(u, scRoles))
                .orElseThrow(() -> new UsernameNotFoundException("Can not find user: " + username));
    }
}
