package com.sc.rp.app.fulfilment.controller;

import java.util.Arrays;
import java.util.List;

import com.sc.rp.data.customer.entity.Customer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FulfilmentController {
    @GetMapping("/v1/temp-fulfilment")
    public List<Customer> getAllCustomer() {
        return Arrays.asList(
                new Customer(1L, "C1 fulfilment"),
                new Customer(2L, "C2 fulfilment"));
    }
}


