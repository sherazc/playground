package com.sc.junit.spring.controller;

import com.sc.junit.spring.model.Employee;
import com.sc.junit.spring.service.EmployeeService;
import com.sc.junit.spring.service.EmployeeServiceImpl;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

// https://www.infoworld.com/article/3543268/junit-5-tutorial-part-2-unit-testing-spring-mvc-with-junit-5.html?page=3

@SpringBootTest
@AutoConfigureMockMvc
class EmployeeControllerTest {


    /**
     * @Mock vs @MockBean:
     * <p>
     * both are mockito mocks.
     * @Mock can be added as method's parameter but @MockBean can only be added
     * on the field. Maybe this will change in the future.
     * @MockBean: adds/replace mock spring bean in Test Spring ApplicationContext.
     * @Mock do not modify Test Spring ApplicationContext.
     * <p>
     * We have to use @MockBean because org.springframework.test.web.servlet.MockMvc
     * uses Test Spring ApplicationContext
     * <p>
     * In our example, @SpringBootTest will create mockito Mock of EmployeeService add it
     * in Test Spring ApplicationContext and Dependency Inject it in EmployeeController
     * We will then invoke EmployeeController using MockMvc
     * <p>
     * NOTE: @MockBean
     */
    @MockBean
    private EmployeeService employeeService;

    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
    }

    @Test
    void findAll() throws Exception {
        /*
        Jayway - JSON Path
        Go through these pages
        https://github.com/json-path/JsonPath
        http://jsonpath.herokuapp.com/
         */

        // Setup
        List<Employee> employees = createEmployees();
        Mockito.doReturn(employees).when(employeeService).findAll();
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/employees")
                .contentType(MediaType.APPLICATION_JSON);

        // Call
        ResultActions resultActions = mockMvc.perform(requestBuilder);

        // Assert
        resultActions
                .andDo(MockMvcResultHandlers.print())
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.header()
                        .string(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON.toString()))
                .andExpect(MockMvcResultMatchers.content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(MockMvcResultMatchers.jsonPath("$", Matchers.hasSize(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.length()", Matchers.is(2)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.[0].id", Matchers.is(10)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.*.name").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.*.age", Matchers.hasItem(10)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.*.age",
                        Matchers.containsInAnyOrder(10, 20)))
                .andExpect(MockMvcResultMatchers.jsonPath("$.*.dateOfBirth",
                        Matchers.hasItem(Matchers.matchesRegex("\\d{4}-\\d{2}-\\d{2}.*"))))
        ;

    }

    private List<Employee> createEmployees() {
        Date dob1 = EmployeeServiceImpl.dateFrom(2001, 1, 1);
        Date dob2 = EmployeeServiceImpl.dateFrom(2002, 2, 2);
        return List.of(
                new Employee(10, "name10", 10, dob1),
                new Employee(20, "name20", 20, dob2));
    }

    @Test
    void add() {
    }

    @Test
    void findById() {
    }

    @Test
    void deleteById() {
    }
}