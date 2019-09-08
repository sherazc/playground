package com.sc.cdb.webservices.prayer;

import com.sc.cdb.data.model.cc.CentralControl;
import com.sc.cdb.data.model.cc.CentralControlCompany;
import com.sc.cdb.services.model.ServiceResponse;
import com.sc.cdb.services.prayer.CentralControlService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
    public ResponseEntity<CentralControlCompany> findByCompanyUrl(@PathVariable String url) {
        CentralControlCompany centralControlCompany = centralControlService.findByCompanyUrl(url);

        if (centralControlCompany == null) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(centralControlCompany);
        }
    }

    @PutMapping("central-control")
    public ResponseEntity<ServiceResponse<String>> saveCentralControl(@RequestBody CentralControl centralControl) {
        ServiceResponse<String> serviceResponse = centralControlService.save(centralControl);
        return ResponseEntity.ok(serviceResponse);
    }
}
