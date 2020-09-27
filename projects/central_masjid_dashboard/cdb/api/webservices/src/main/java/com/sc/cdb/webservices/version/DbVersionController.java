package com.sc.cdb.webservices.version;

import com.sc.cdb.data.model.version.CompanyDataVersion;
import com.sc.cdb.data.model.version.CompanyListVersion;
import com.sc.cdb.services.version.DbVersionService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/version", produces = MediaType.APPLICATION_JSON_VALUE)
@AllArgsConstructor
public class DbVersionController {

    private DbVersionService dbVersionService;

    @GetMapping("company/{companyId}/data/upgrade")
    public ResponseEntity<CompanyDataVersion> upgradeCompanyDataVersion(@PathVariable String companyId) {
        return ResponseEntity.ok(dbVersionService.upgradeCompanyDataVersion(companyId));
    }

    @GetMapping("company/{companyId}/data")
    public ResponseEntity<CompanyDataVersion> getCompanyDataVersion(@PathVariable String companyId){
        return ResponseEntity.ok(dbVersionService.getCompanyDataVersion(companyId));
    }

    @GetMapping("company/list/upgrade")
    public ResponseEntity<CompanyListVersion> upgradeCompanyListVersion(){
        return ResponseEntity.ok(dbVersionService.upgradeCompanyListVersion());
    }

    @GetMapping("company/list")
    public ResponseEntity<CompanyListVersion> getCompanyListVersion(){
        return ResponseEntity.ok(dbVersionService.getCompanyListVersion());
    }
}
