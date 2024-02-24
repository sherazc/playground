package com.sc.sb.auth.repository

import com.sc.sb.auth.entity.ScRole
import org.springframework.data.repository.CrudRepository

interface ScRoleRepository : CrudRepository<ScRole, Long>{
}