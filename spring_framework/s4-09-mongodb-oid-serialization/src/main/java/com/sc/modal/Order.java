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
public class Order {

    @Id
    private ObjectId id;

    private ObjectId userId;

    private String orderName;

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

    public String getUserId() {
        return this.userId == null ? null : this.userId.toHexString();
    }

    public void setUserId(String userId) {
        if (userId  == null) {
            this.userId  = null;
        } else {
            this.userId  = new ObjectId(userId);
        }
    }
}
