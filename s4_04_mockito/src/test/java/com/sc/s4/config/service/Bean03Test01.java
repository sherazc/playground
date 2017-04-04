package com.sc.s4.config.service;


import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.inject.Inject;

@Configuration
@ComponentScan("com.sc.s4")
class Bean03Test01Config {
}

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {Bean03Test01Config.class})
public class Bean03Test01 {

    @Mock
    private Bean02 bean02;

    @Inject
    @InjectMocks
    private Bean03 bean03;

    @Before
    public void init() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testAdd40() {
        Assert.assertNotNull(bean02);
        Assert.assertNotNull(bean03);

        bean03.setExtra(5);
        Mockito.when(bean02.add50(Mockito.anyInt())).thenReturn(450);

        int add40Result = bean03.add40(400);

        Assert.assertEquals(445, add40Result);

        Mockito.verify(bean02, Mockito.times(1)).add50(Mockito.anyInt());
    }

}
