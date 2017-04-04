package com.sc.xml;

import javax.xml.XMLConstants;
import javax.xml.transform.stream.StreamSource;
import javax.xml.validation.Schema;
import javax.xml.validation.SchemaFactory;
import javax.xml.validation.Validator;

public class ValidateXML01 {
	public static void main(String[] args) throws Exception {
		SchemaFactory factory = SchemaFactory.newInstance(XMLConstants.W3C_XML_SCHEMA_NS_URI);
		Schema schema = factory.newSchema(new StreamSource("./xmls/xsd01.xsd"));
		Validator validator = schema.newValidator();
		validator.validate(new StreamSource("./xmls/xml01.xml"));
		System.out.println("Valid xml file: " + "./xmls/xml01.xml");
	}
}
