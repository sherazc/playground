package com.sc.modal;

import com.fasterxml.jackson.annotation.JsonInclude;
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
public class User {

    @Id
    private ObjectId id;
    private String userName;

    public String getId() {
        return this.id == null ? null : this.id.toHexString();
    }

    public void setId(String id) {
        if (id == null) {
            this.id = null;
        } else {
            this.id = new ObjectId(id);
        }
    }
}
