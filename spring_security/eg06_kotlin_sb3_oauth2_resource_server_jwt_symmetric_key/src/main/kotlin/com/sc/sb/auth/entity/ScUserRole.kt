package com.sc.sb.auth.entity

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.GeneratedValue
import jakarta.persistence.GenerationType
import jakarta.persistence.Id
import jakarta.persistence.JoinColumn
import jakarta.persistence.ManyToOne
import jakarta.persistence.Table

@Entity
@Table(name = "SC_USER_ROLE")
data class ScUserRole(
        @Id
        @GeneratedValue(strategy = GenerationType.AUTO)
        @Column(name = "ID")
        val id: Long?,

        @ManyToOne
        @JoinColumn(name = "SC_USER_ID")
        val scUser: ScUser?,

        @ManyToOne
        @JoinColumn(name = "SC_ROLE_ID")
        val scRole: ScRole?

)
