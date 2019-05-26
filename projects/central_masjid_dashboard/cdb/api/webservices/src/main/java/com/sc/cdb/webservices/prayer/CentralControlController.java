package com.sc.cdb.webservices.prayer;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/companies", produces = MediaType.APPLICATION_JSON_VALUE)
public class CentralControlController {


  @GetMapping("url/{url}/central-control")
  public ResponseEntity<?> findByCompanyUrl(@PathVariable String url) {




    return ResponseEntity.ok("Working");
  }
}
