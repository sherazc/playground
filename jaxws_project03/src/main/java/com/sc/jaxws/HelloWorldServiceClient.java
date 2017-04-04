package com.sc.jaxws;

import java.net.URL;

import javax.xml.namespace.QName;

public class HelloWorldServiceClient {

	public static void main(String[] args) throws Exception {
		URL wsdlURL = new URL("http://localhost:8080/jaxws_project03/ws/helloworld?wsdl");
		QName helloWorldQName = new QName("http://jaxws.sc.com/", "HelloWorldServiceImplService");
		HelloWorldServiceImplService helloWorldServiceImplService = new HelloWorldServiceImplService(wsdlURL,
				helloWorldQName);

		HelloWorldService helloWorldService = helloWorldServiceImplService.getHelloWorldServiceImplPort();
		String result = helloWorldService.sayHello("Sheraz");

		System.out.println(result);
	}
}
