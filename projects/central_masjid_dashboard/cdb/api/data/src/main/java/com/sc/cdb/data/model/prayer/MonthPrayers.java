package com.sc.cdb.data.model.prayer;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MonthPrayers {
    private Month month;
    private List<Prayer> prayers;
}
