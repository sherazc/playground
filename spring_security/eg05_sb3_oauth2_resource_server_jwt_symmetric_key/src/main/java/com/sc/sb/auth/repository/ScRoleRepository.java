package com.sc.sb.auth.repository;

import com.sc.sb.auth.entity.ScRole;
import com.sc.sb.auth.entity.ScUser;
import org.springframework.data.repository.CrudRepository;

public interface ScRoleRepository extends CrudRepository<ScRole, Long> {
}
