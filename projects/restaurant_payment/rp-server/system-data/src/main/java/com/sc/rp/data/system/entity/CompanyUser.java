package com.sc.rp.data.system.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "company_user")
public class CompanyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "company_id")
    private Company company;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean active;

    @Size(min = 1, max = 50, message = "{companyUser.firstName.invalid}")
    @Column(name = "first_name")
    private String firstName;

    @Size(min = 1, max = 50, message = "{companyUser.lastName.invalid}")
    private String lastName;

    @Email(message = "{companyUser.email.invalid}")
    private String email;

    @Size(min = 8, max = 100, message = "{companyUser.password.invalid}")
    private String password;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "company_user_role",
            joinColumns = {@JoinColumn(name = "company_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    Set<UserRole> userRoles = new HashSet<>();
}
