package com.sc.cdb.data.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import java.util.Date;

@Data
public class BaseModel {
    @JsonIgnore
    private Date createdDate, updatedDate;
    @JsonIgnore
    private String createdBy, updatedBy;
}
