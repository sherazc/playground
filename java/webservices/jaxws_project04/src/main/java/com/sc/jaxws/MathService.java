package com.sc.jaxws;

import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.jws.WebService;
import javax.jws.soap.SOAPBinding;
import javax.jws.soap.SOAPBinding.Style;
import javax.jws.soap.SOAPBinding.Use;

@WebService
@SOAPBinding(style = Style.RPC, use = Use.LITERAL)
public interface MathService {

	@WebMethod(operationName = "add")
	int addNums(@WebParam(name = "num1") int num1, @WebParam(name = "num2") int num2);
}
