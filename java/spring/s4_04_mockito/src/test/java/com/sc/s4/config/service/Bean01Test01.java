package com.sc.s4.config.service;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;

@Configuration
@ComponentScan(basePackages = {"com.sc.s4.config.service"})
class Bean01Test01Config {
}

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {Bean01Test01Config.class})
public class Bean01Test01 {

    @Inject
    private Bean01 bean01;

    @Test
    public void testAdd10() {
        int add10Result = bean01.add10(100);
        Assert.assertEquals(110, add10Result);
    }
}
