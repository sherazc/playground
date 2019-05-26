package com.sc.cdb.webservices.prayer;

import com.sc.cdb.data.model.cc.CentralControlCompany;
import com.sc.cdb.services.prayer.CentralControlService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/companies", produces = MediaType.APPLICATION_JSON_VALUE)
public class CentralControlController {

  private CentralControlService centralControlService;

  public CentralControlController(CentralControlService centralControlService) {
    this.centralControlService = centralControlService;
  }


  @GetMapping("url/{url}/central-control")
  public ResponseEntity<?> findByCompanyUrl(@PathVariable String url) {
    CentralControlCompany centralControlCompany = centralControlService.findByCompanyUrl(url);

    if (centralControlCompany == null) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.ok(centralControlCompany);
    }
  }
}
