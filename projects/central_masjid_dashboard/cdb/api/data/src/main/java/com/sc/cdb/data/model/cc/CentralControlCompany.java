package com.sc.cdb.data.model.cc;

import com.sc.cdb.data.model.auth.Company;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.List;

@Data
@EqualsAndHashCode(callSuper = false)
public class CentralControlCompany extends CentralControl {
  private List<Company> company;
}
