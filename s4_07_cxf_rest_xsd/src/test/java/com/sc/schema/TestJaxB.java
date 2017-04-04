package com.sc.schema;

import com.sc.schema.company.Department;
import com.sc.schema.company.ObjectFactory;
import org.junit.Test;

import javax.xml.bind.*;

public class TestJaxB {

    @Test
    public void testJaxB() throws JAXBException {

        JAXBContext jaxbContext = JAXBContext.newInstance("com.sc.schema");
        ObjectFactory objectFactory = new ObjectFactory();
        Department department = objectFactory.createDepartment();



    }
}
