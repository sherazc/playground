package com.sc.cdb.data.model.cc;

import com.sc.cdb.data.model.auth.BaseModel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotNull;

import java.util.List;

@Document(collection = "centralControl")
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class CentralControl {
    @Id
    private ObjectId id;

    @NotNull
    private ObjectId companyId;

    private List<Announcement> announcements;
    private List<CustomConfiguration> customConfigurations;
    private List<Event> events;
    private List<Expense> expenses;
    private List<Fund> funds;
    private List<Jummah> jummahs;
    private List<Sheet> expenseSheets;

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
}
