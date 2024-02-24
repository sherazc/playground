package com.sc.sb.auth.config

import com.sc.sb.auth.entity.ScUser
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.userdetails.UserDetails

class ScUserDetail(
    private val scUser: ScUser,
    private val scRoles: Collection<String>
) : UserDetails {
    override fun getAuthorities(): Collection<GrantedAuthority> = scRoles
        .filter { it.isNotBlank() }
        .map { SimpleGrantedAuthority(it) }

    override fun getPassword(): String = scUser.userPassword
    override fun getUsername(): String = scUser.userName
    override fun isAccountNonExpired(): Boolean = true
    override fun isAccountNonLocked(): Boolean = true
    override fun isCredentialsNonExpired(): Boolean = true
    override fun isEnabled(): Boolean = true
}