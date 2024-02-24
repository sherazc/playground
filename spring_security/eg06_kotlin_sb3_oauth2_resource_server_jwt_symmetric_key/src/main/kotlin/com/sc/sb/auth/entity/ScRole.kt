package com.sc.sb.auth.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.ManyToMany
import jakarta.persistence.Table

@Entity
@Table(name = "SC_ROLE")
data class ScRole(
        @Id @GeneratedValue(strategy = GenerationType.AUTO) @Column(name = "ID")
        val id: Long?,

        @Column(name = "ROLE_NAME")
        val roleName: String?,

        @ManyToMany(mappedBy = "scRoles")
        val scUsers: Set<ScUser>?
)
