package com.sc.rp.data.system.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@NoArgsConstructor
@Table(name = "company")
public class Company {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Size(min = 2, max = 60, message = "{company.name.invalid}")
    private String name;

    @Pattern(regexp = "(^$|[0-9]{10})", message = "{company.phone.invalid}")
    private String phone;

    @Size(min = 2, max = 60, message = "{company.street.invalid}")
    private String street;

    @Size(min = 2, max = 60, message = "{company.city.invalid}")
    private String city;

    private String state;

    @Size(min = 5, max = 10, message = "{company.zip.invalid}")
    private String zip;

    @Column(nullable = false, columnDefinition = "TINYINT(1)")
    private Boolean active;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "current_pricing_plan_id")
    private PricingPlan currentPricingPlan;
}
