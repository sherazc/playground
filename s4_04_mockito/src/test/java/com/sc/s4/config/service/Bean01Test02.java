package com.sc.s4.config.service;

import com.sc.s4.config.service.Bean01;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mockito;

public class Bean01Test02 {

    private Bean01 bean01;

    @Before
    public void init() {
        bean01 = Mockito.mock(Bean01.class);
    }

    @Test
    public void testBean01() {
        System.out.println(bean01);
        Assert.assertNotNull(bean01);
        Mockito.when(bean01.add10(100)).thenReturn(110);
        Assert.assertEquals(110, bean01.add10(100));
        Mockito.verify(bean01, Mockito.times(1)).add10(100);
    }

}
