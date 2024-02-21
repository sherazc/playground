package com.sc.sb.auth.entity

import jakarta.persistence.*

@Entity
data class ScUser(
        @Id val id: Long,
        @Column(name = "USER_NAME")
        val userName: String,
        @Column(name = "USER_PASSWORD")
        val userPassword: String,

        @ManyToMany
        @JoinTable(name = "SC_USER_ROLE", joinColumns = [JoinColumn(name = "SC_USER_ID")], inverseJoinColumns = [JoinColumn(name = "SC_ROLE_ID")])
        private var scRoles: Set<ScRole?>? = null
)