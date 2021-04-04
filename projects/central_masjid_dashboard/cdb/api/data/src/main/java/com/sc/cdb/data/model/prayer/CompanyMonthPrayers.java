package com.sc.cdb.data.model.prayer;

import java.util.List;

import com.sc.cdb.data.model.auth.Company;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CompanyMonthPrayers {
    private Company company;
    private List<MonthPrayers> monthPrayers;
}
