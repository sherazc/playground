package com.sc.cdb.data.model.auth;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import org.bson.types.ObjectId;

import java.util.Date;

@Data
public class BaseModel {
    @JsonIgnore
    private Date createdDate, updatedDate;
    @JsonIgnore
    private String createdBy, updatedBy;

    public static String objectIdToHexString(ObjectId objectId) {
        return objectId == null ? null : objectId.toHexString();
    }

    public static ObjectId hexStringToObjectId(String hexString) {
        if (hexString == null) {
            return null;
        } else {
            return new ObjectId(hexString);
        }
    }
}
