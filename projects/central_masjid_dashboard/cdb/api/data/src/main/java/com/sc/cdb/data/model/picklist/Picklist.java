package com.sc.cdb.data.model.picklist;

import java.util.List;

import javax.validation.constraints.NotBlank;

import com.sc.cdb.data.model.auth.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "picklist")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Picklist {

    @Id
    private ObjectId id;

    private List<Configuration> configurations;

    public String getId() {
        return BaseModel.objectIdToHexString(this.id);
    }

    public void setId(String id) {
        this.id = BaseModel.hexStringToObjectId(id);
    }
}