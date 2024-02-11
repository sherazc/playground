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
@Table(name = "SC_USER")
public class ScUser {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ID")
    private Long id;

    @Column(name = "USER_NAME")
    private String userName;

    @Column(name = "USER_PASSWORD")
    private String userPassword;


    @ManyToMany
    @JoinTable(
            name = "SC_USER_ROLE",
            joinColumns = @JoinColumn(name="SC_USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "SC_ROLE_ID"))
    private Set<ScRole> scRoles;
}
