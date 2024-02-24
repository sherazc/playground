package com.sc.sb.auth.config

import com.sc.sb.auth.entity.ScUser
import com.sc.sb.auth.repository.ScUserRepository
import com.sc.sb.auth.repository.ScUserRoleRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import java.util.Optional

@Service
class ScUserDetailServiceImpl(
    val scUserRepository: ScUserRepository,
    val scUserRoleRepository: ScUserRoleRepository
) : UserDetailsService {

    override fun loadUserByUsername(username: String?): UserDetails {
        val scUser: Optional<ScUser> = scUserRepository.findByUserNameIgnoreCase(username.orEmpty());

        // For trailing lambdas () parenthesis are not required. we just need curly braces
        // "it" is implicit variable
        val scRoleName: List<String> = scUser
            .map { it.id }
            .map { scUserRoleRepository.findScRolesByScUserId(it) }
            .orElse(listOf())


        return scUser
            .map { ScUserDetail(it, scRoleName) }
            .orElseThrow { UsernameNotFoundException("Can not find user: $username") }
    }
}