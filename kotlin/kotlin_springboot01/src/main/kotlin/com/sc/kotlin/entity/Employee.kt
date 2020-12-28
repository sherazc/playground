package com.sc.kotlin.entity

import javax.persistence.*

@Entity
data class Employee(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        val id: Int?,
        @Column(nullable = false)
        val name: String
)
