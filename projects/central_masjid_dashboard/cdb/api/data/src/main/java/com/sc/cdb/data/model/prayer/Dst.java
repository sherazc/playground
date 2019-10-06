package com.sc.cdb.data.model.prayer;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Dst {
    private Boolean enable;
    private Boolean automaticCalculate;
    private String beginMonthDate;
    private String endMonthDate;
}
