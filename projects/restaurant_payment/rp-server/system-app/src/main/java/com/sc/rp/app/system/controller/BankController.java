package com.sc.rp.app.system.controller;

import javax.validation.Valid;

import com.sc.rp.data.system.entity.Bank;
import com.sc.rp.lib.common.model.ServiceResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("bank")
public class BankController {

    @PostMapping("validate")
    public ResponseEntity<ServiceResponse<String>> validateBank(@Valid @RequestBody Bank bank) {
        // TODO Research on Strips and implement account validation service
        ServiceResponse.ServiceResponseBuilder<String> response = ServiceResponse.builder();
        if ("000".equalsIgnoreCase(bank.getStripAccount())) {
            response.target("Bad Account").successful(false);
        } else {
            response.target("ABC123").successful(true);
        }
        return ResponseEntity.ok(response.build());
    }
}
