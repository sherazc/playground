package com.sc.cdb.data.model.cc;

import com.sc.cdb.data.model.auth.Company;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class CentralControlCompany extends CentralControl {
  private Company company;
}
