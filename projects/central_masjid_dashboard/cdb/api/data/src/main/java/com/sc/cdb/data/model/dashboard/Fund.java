package com.sc.cdb.data.model.dashboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Fund {
    private String name;
    private Double goal;
    private Double current;
    private Double pledge;
    private Date endDate;

}
