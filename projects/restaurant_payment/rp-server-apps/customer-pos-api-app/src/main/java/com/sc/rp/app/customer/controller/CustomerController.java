package com.sc.rp.app.customer.controller;

import java.util.Arrays;
import java.util.List;

import com.sc.rp.data.customer.entity.Customer;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class CustomerController {

    @GetMapping
    public List<Customer> getAllCustomer() {
        return Arrays.asList(
                new Customer(1L, "C1 customer pos"),
                new Customer(2L, "C2 customer pos"));
    }
}
