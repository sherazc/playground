package com.sc.s4.config.service;

import com.sc.s4.config.service.Bean01;
import com.sc.s4.config.service.Bean02;
import com.sc.s4.config.service.Bean02Impl;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;


@RunWith(MockitoJUnitRunner.class)
public class Bean02Test01 {

    @Mock
    private Bean01 bean01;

    @InjectMocks
    private Bean02 bean02 = new Bean02Impl();

    @Test
    public void testBean02() {
        Assert.assertNotNull(bean01);

        Mockito.when(bean01.add10(Mockito.anyInt())).thenReturn(210);

        int add50Result = bean02.add50(200);

        Assert.assertEquals(250, add50Result);

        Mockito.verify(bean01, Mockito.times(1)).add10(Mockito.anyInt());
    }

}
