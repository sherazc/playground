package com.sc.junit.spring.controller;

import com.sc.junit.spring.service.EmployeeService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
class EmployeeControllerTest {


    /**
     * @Mock vs @MockBean:
     *
     * both are mockito mocks.
     *
     * @Mock can be added as method's parameter but @MockBean can only be added
     * on the field. Maybe this will change in the future.
     *
     * @MockBean: adds/replace mock spring bean in Test Spring ApplicationContext.
     * @Mock do not modify Test Spring ApplicationContext.
     *
     * We have to use @MockBean because org.springframework.test.web.servlet.MockMvc
     * uses Test Spring ApplicationContext
     *
     * In our example, @SpringBootTest will create mockito Mock of EmployeeService add it
     * in Test Spring ApplicationContext and Dependency Inject it in EmployeeController
     * We will then invoke EmployeeController using MockMvc
     *
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
    void findAll() {
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