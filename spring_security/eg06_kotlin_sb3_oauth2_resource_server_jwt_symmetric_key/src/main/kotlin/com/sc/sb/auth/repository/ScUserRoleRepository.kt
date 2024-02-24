package com.sc.sb.auth.repository

import com.sc.sb.auth.entity.ScUserRole
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository
import org.springframework.data.repository.query.Param

interface ScUserRoleRepository : CrudRepository<ScUserRole, Long> {

    @Query(
        """
        select scRole.roleName from ScRole scRole
        join ScUserRole scUserRole on scRole.id = scUserRole.scRole.id
        where scUserRole.scUser.id = :scUserId"""
    )
    fun findScRolesByScUserId(@Param("scUserId") scUserId: Long): List<String>
}