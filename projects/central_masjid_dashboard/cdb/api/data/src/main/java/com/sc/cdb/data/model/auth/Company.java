package com.sc.cdb.data.model.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Company extends BaseModel {
    @Id
    private String id;
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
