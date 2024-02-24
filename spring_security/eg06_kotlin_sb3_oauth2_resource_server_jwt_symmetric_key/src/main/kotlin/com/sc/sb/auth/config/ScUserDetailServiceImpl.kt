package com.sc.sb.auth.config

import com.sc.sb.auth.repository.ScUserRepository
import com.sc.sb.auth.repository.ScUserRoleRepository
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service

@Service
class ScUserDetailServiceImpl(
    val scUserRepository: ScUserRepository,
    val scUserRoleRepository: ScUserRoleRepository
) : UserDetailsService {

    override fun loadUserByUsername(username: String?): UserDetails {
        TODO("Not yet implemented")
    }
}