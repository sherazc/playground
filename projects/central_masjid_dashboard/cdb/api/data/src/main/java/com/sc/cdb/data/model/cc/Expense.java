package com.sc.cdb.data.model.cc;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = false)
public class Expense {
    private String lineItem;
    private Double amount;
    private Boolean enabled;
}
