package com.sc.sb.auth.repository;

import com.sc.sb.auth.entity.ScUser;
import com.sc.sb.auth.entity.ScUserRole;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

public interface ScUserRoleRepository extends CrudRepository<ScUserRole, Long> {

    List<ScUserRole> findByScUser_Id(Long scUserId);
}
