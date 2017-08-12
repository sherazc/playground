package com.sc.jaxws;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;
import javax.jws.soap.SOAPBinding.Use;

import com.sc.spring3.domain.Customer;

@WebService(name = "storeService")
@SOAPBinding(style = Style.DOCUMENT, use = Use.LITERAL)
public interface StoreService {

	@WebMethod(operationName = "insertOrUpdateCustomer")
	Customer insertOrUpdateCustomer(@WebParam(name = "customer") Customer customer);

	@WebMethod(operationName = "getCustomerById")
	Customer getCustomerById(@WebParam(name = "customerId") Long id);

	@WebMethod(operationName = "removeCustomer")
	void removeCustomer(@WebParam(name = "customerId") Long id);
}
