package com.sc.cdb.data.model.auth;

import java.util.Date;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.sc.cdb.data.common.util.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class Company extends BaseModel {
    @Id
    private ObjectId id;

    @NotBlank
    private String name;
    @NotBlank
    private String url;
    @NotBlank
    private String website;
    @Valid
    private Address address;
    private Boolean active;
    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date expirationDate;

    public String getId() {
        return BaseModel.objectIdToHexString(this.id);
    }

    public void setId(String id) {
        this.id = BaseModel.hexStringToObjectId(id);
    }

    public boolean isActive() {
        // TODO: remove hardcoded value and once activate logic is complete
        return true;
    }

    public void setActive(boolean active) {
        this.active = active;
    }
}
