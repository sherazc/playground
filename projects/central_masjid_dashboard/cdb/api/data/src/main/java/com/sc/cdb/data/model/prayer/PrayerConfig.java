package com.sc.cdb.data.model.prayer;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.sc.cdb.data.model.auth.BaseModel;
import com.sc.cdb.data.model.cc.GeoCode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class PrayerConfig {

    @Id
    private ObjectId id;

    @NotNull
    private ObjectId companyId;

    private String location;
    private Integer calculationMethod;
    private Integer asrJuristicMethod;
    private int[] prayerOffsetMinutes = new int[7];
    private GeoCode geoCode;

    private Dst dst;

    private List<Prayer> prayers;


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
