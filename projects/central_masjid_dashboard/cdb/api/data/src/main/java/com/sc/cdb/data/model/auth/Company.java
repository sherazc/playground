package com.sc.cdb.data.model.auth;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Company extends BaseModel {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;
    @NotBlank
    private String name;
    @NotBlank
    private String url;
    @Valid
    private Address address;
    private boolean active;
    private Date expirationDate;


    public boolean isActive() {
        // TODO: remove hardcoded value and once activate logic is complete
        return true;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
