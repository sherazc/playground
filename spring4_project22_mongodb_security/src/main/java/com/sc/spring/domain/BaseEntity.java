package com.sc.spring.domain;


import org.springframework.data.annotation.Id;

public abstract class BaseEntity {

    @Id
    private String id;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
