package com.sc.sb.auth.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.JoinTable
import jakarta.persistence.ManyToMany
import jakarta.persistence.Table

@Entity
@Table(name = "SC_USER")
data class ScUser(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        val id: Long,

        @Column(name = "USER_NAME")
        val userName: String,

        @Column(name = "USER_PASSWORD")
        val userPassword: String,

        @ManyToMany
        @JoinTable(
                name = "SC_USER_ROLE",
                joinColumns = [JoinColumn(name = "SC_USER_ID")],
                inverseJoinColumns = [JoinColumn(name = "SC_ROLE_ID")])
        private var scRoles: Set<ScRole?>?
)