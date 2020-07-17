package com.sc.rp.app.system.controller;

import java.util.List;

import com.sc.rp.data.customer.entity.Customer;
import com.sc.rp.data.customer.repository.CustomerRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    private CustomerRepository customerRepository;

    public HomeController(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    @GetMapping({"/", "/home"})
    public String home() {
        return "home";
    }

    @GetMapping({"/customers"})
    public List<Customer> getCustomers() {
        return customerRepository.findAll();
    }


}
