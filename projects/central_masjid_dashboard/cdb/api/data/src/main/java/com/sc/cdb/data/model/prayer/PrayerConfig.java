package com.sc.cdb.data.model.prayer;

import java.util.List;

import javax.validation.constraints.NotBlank;

import com.sc.cdb.data.model.cc.GeoCode;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class PrayerConfig {

    @Id
    private String id;

    @NotBlank
    private String companyId;

    private String location;
    private Integer calculationMethod;
    private Integer asrJuristicMethod;
    private int[] prayerOffsetMinutes = new int[7];
    private GeoCode geoCode;

    private List<Prayer> prayers;
}