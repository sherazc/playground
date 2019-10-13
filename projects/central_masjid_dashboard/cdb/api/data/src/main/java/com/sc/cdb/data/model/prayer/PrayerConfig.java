package com.sc.cdb.data.model.prayer;

import java.util.List;

import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
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

    @JsonSerialize(using = ToStringSerializer.class)
    @NotBlank
    private ObjectId companyId;

    private String location;
    private Integer calculationMethod;
    private Integer asrJuristicMethod;
    private int[] prayerOffsetMinutes = new int[7];
    private GeoCode geoCode;

    private Dst dst;

    private List<Prayer> prayers;
}
