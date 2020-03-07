package com.sc.cdb.data.model.cc;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sc.cdb.data.common.util.Constants;
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
    @JsonFormat(pattern= Constants.DATE_FORMAT)
    private Date endDate;
    private Boolean enabled;

}
