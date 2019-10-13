package com.sc.cdb.data.model.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import com.sc.cdb.data.model.auth.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class User extends BaseModel {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @JsonSerialize(using = ToStringSerializer.class)
    @NotBlank
    private ObjectId companyId;

    @NotBlank
    private String email;
    private String password;
    private String firstName, lastName;
    private List<String> roles;
    private boolean active;
    private boolean verified;

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isActive() {
        // TODO: remove hardcoded value and once activate logic is complete
        return true;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isVerified() {
        // TODO: remove hardcoded value and once activate logic is complete
        return true;
    }

    public void setVerified(boolean verified) {
        this.verified = verified;
    }
}
