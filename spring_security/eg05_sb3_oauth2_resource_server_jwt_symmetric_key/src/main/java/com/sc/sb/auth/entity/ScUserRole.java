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
@Table(name = "SC_USER_ROLE")
public class ScUserRole {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "SC_USER_ID")
    private ScUser scUser;

    @ManyToOne
    @JoinColumn(name = "SC_ROLE_ID")
    private ScRole scRole;
}
