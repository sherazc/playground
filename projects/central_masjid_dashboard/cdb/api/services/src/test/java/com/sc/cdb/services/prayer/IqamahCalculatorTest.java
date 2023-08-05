package com.sc.cdb.services.prayer;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.MockitoAnnotations;


public class IqamahCalculatorTest {

    private IqamahCalculator iqamahCalculator;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        iqamahCalculator = new IqamahCalculator();
    }

    @Test
    public void calculateA() {
        // Setup
        String azanTime = "06:03";
        int[] azanTimeInt = {6, 3};
        String iqamahTime = "06:15";
        int[] iqamahTimeInt = {6, 15};

        // Call
        String iqamahTimeResult = iqamahCalculator.calculate(
                azanTime, 10, IqamahCalculator.MinutesRound.roundTo15);

        // Assert
        Assert.assertEquals(iqamahTime, iqamahTimeResult);
    }


    @Test
    public void calculateB() {
        // Setup
        String azanTime = "6:3";
        int[] azanTimeInt = {6, 3};
        String iqamahTime = "06:30";
        int[] iqamahTimeInt = {6, 30};

        // Call
        String iqamahTimeResult = iqamahCalculator.calculate(
                azanTime, 10, IqamahCalculator.MinutesRound.roundTo30);

        // Assert
        Assert.assertEquals(iqamahTime, iqamahTimeResult);
    }

    @Test
    public void calculateC() {
        // Setup
        String azanTime = "23:55";
        int[] azanTimeInt = {23, 55};
        String iqamahTime = "00:30";
        int[] iqamahTimeInt = {0, 30};

        // Call
        String iqamahTimeResult = iqamahCalculator.calculate(
                azanTime, 35, IqamahCalculator.MinutesRound.roundTo30);

        // Assert
        Assert.assertEquals(iqamahTime, iqamahTimeResult);
    }

    @Test
    public void calculateD() {
        // Setup
        String azanTime = "13:25";
        int[] azanTimeInt = {13, 25};
        String iqamahTime = "14:00";
        int[] iqamahTimeInt = {14, 0};

        // Call
        String iqamahTimeResult = iqamahCalculator.calculate(
                azanTime, 15, IqamahCalculator.MinutesRound.roundTo30);

        // Assert
        Assert.assertEquals(iqamahTime, iqamahTimeResult);
    }

    @Test
    public void calculateE() {
        // Setup
        String azanTime = "20:15";
        int[] azanTimeInt = {20, 15};
        String iqamahTime = "20:25";
        int[] iqamahTimeInt = {20, 25};

        // Call
        String iqamahTimeResult = iqamahCalculator.calculate(
                azanTime, 10, IqamahCalculator.MinutesRound.noRound);

        // Assert
        Assert.assertEquals(iqamahTime, iqamahTimeResult);
    }
}