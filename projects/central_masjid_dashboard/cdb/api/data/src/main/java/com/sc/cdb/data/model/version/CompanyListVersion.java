package com.sc.cdb.data.model.version;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.sc.cdb.data.model.auth.BaseModel;
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
public class CompanyListVersion  extends BaseModel {
    @Id
    private ObjectId id;

    private Long version;

    public String getId() {
        return BaseModel.objectIdToHexString(this.id);
    }

    public void setId(String id) {
        this.id = BaseModel.hexStringToObjectId(id);
    }
}
