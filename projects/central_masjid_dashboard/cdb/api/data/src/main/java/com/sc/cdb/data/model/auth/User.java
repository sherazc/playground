package com.sc.cdb.data.model.auth;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.sc.cdb.data.common.util.Constants;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class User extends BaseModel {
    @Id
    private ObjectId id;

    @NotNull
    private ObjectId companyId;

    @NotBlank
    private String email;
    private String password;
    private String firstName, lastName;
    private List<String> roles;
    private String emailVerifyCode;

    @JsonFormat(pattern= Constants.DATE_TIME_FORMAT)
    private Date registrationDate;
    private boolean active;
    private boolean verified;

    public String getId() {
        return BaseModel.objectIdToHexString(this.id);
    }

    public void setId(String id) {
        this.id = BaseModel.hexStringToObjectId(id);
    }

    public String getCompanyId() {
        return BaseModel.objectIdToHexString(this.companyId);
    }

    public void setCompanyId(String companyId) {
        this.companyId = BaseModel.hexStringToObjectId(companyId);
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }
}
