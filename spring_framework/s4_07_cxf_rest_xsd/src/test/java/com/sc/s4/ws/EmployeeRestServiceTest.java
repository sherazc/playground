package com.sc.s4.ws;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = {"classpath:/context.xml"})
public class EmployeeRestServiceTest {

    private RestTemplate restTemplate = new RestTemplate();

    @Test
    public void testEmployees() {
/*
        String url = "http://localhost:8080/rest/company/employees";
        ResponseEntity<? extends ArrayList> responseEntity = restTemplate.getForEntity(url, new ArrayList<Employee>().getClass());
        Assert.assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        List<Employee> employees = responseEntity.getBody();
        Assert.assertTrue(employees.size() > 0);

        */
    }
}
