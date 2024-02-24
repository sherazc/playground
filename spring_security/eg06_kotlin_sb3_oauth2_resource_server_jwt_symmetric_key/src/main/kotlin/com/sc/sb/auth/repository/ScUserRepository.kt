package com.sc.sb.auth.repository

import com.sc.sb.auth.entity.ScUser
import org.springframework.data.repository.CrudRepository
import java.util.Optional

interface ScUserRepository: CrudRepository<ScUser, Long> {
    fun findByUserNameIgnoreCase(userName: String): Optional<ScUser>
}