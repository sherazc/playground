package com.sc.cdb.webservices.picklist;

import java.util.List;

import com.sc.cdb.data.model.picklist.Configuration;
import com.sc.cdb.services.picklist.PicklistService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/picklist")
public class PicklistController {

    private PicklistService picklistService;

    public PicklistController(PicklistService picklistService) {
        this.picklistService = picklistService;
    }

    @GetMapping("configuration")
    public List<Configuration> getAllConfiguration() {
        return this.picklistService.getAllConfiguration();
    }
}
