package com.sc.jaxws;

import javax.inject.Inject;
import javax.inject.Named;
import javax.jws.WebService;

import org.springframework.stereotype.Component;

import com.sc.spring3.domain.Customer;
import com.sc.spring3.service.CustomerService;

@WebService(endpointInterface = "com.sc.jaxws.StoreService")
@Component("storeService")
public class StoreServiceImpl implements StoreService {

	@Inject
	@Named("customerService")
	private CustomerService customerService;

	@Override
	public Customer insertOrUpdateCustomer(Customer customer) {
		return customerService.createOrUpdateCustomer(customer);
	}

	@Override
	public Customer getCustomerById(Long id) {
		return customerService.getCustomerById(id);
	}

	@Override
	public void removeCustomer(Long id) {
		customerService.deleteCustomer(id);
	}

}
