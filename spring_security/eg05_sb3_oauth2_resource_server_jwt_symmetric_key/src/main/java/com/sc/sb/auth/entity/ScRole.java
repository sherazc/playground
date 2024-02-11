package com.sc.sb.auth.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "SC_ROLE")
public class ScRole {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "ROLE_NAME")
    private String roleName;

    @ManyToMany(mappedBy = "scRoles")
    private Set<ScUser> scUsers;

}
