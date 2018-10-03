package com.sc.cdb.data.model;

import lombok.Data;

import java.util.Date;

@Data
public class BaseModel {
    private Date createdDate, updatedDate;
    private String createdBy, updatedBy;
}
