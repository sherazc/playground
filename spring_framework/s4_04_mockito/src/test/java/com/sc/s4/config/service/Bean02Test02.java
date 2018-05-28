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
@ComponentScan(basePackageClasses = {Bean02.class})
class Bean02Test02Config{
}

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(classes = {Bean02Test02Config.class})
public class Bean02Test02 {

    @Mock
    private Bean01 bean01;

    @Inject
    @InjectMocks
    private Bean02 bean02;

    @Before
    public void init() {
        // This line is mandatory if not running with MockitoJUnitRunner
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testBean02() {
        Assert.assertNotNull(bean01);
        Assert.assertNotNull(bean02);

        Mockito.when(bean01.add10(Mockito.anyInt())).thenReturn(310);

        int add50Result = bean02.add50(300);

        Assert.assertEquals(350, add50Result);

        Mockito.verify(bean01, Mockito.times(1)).add10(Mockito.anyInt());
    }

}
