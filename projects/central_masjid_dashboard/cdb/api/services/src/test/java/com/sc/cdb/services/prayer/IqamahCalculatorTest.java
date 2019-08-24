package com.sc.cdb.services.prayer;

import java.util.Calendar;

import com.sc.cdb.services.common.DateTimeCalculator;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;


public class IqamahCalculatorTest {

    private IqamahCalculator iqamahCalculator;

    @Mock
    private DateTimeCalculator dateTimeCalculator;

    @Before
    public void setUp() throws Exception {
        MockitoAnnotations.initMocks(this);

        iqamahCalculator = new IqamahCalculator(dateTimeCalculator);
    }

    @Test
    public void calculateA() {
        // Setup
        String azanTime = "06:03";
        int[] azanTimeInt = {6, 3};
        String iqamahTime = "06:15";
        int[] iqamahTimeInt = {6, 15};

        setupDateTimeCalculatorMock(azanTime, azanTimeInt, iqamahTime, iqamahTimeInt);

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

        setupDateTimeCalculatorMock(azanTime, azanTimeInt, iqamahTime, iqamahTimeInt);

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

        setupDateTimeCalculatorMock(azanTime, azanTimeInt, iqamahTime, iqamahTimeInt);

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

        setupDateTimeCalculatorMock(azanTime, azanTimeInt, iqamahTime, iqamahTimeInt);

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

        setupDateTimeCalculatorMock(azanTime, azanTimeInt, iqamahTime, iqamahTimeInt);

        // Call
        String iqamahTimeResult = iqamahCalculator.calculate(
                azanTime, 10, IqamahCalculator.MinutesRound.noRound);

        // Assert
        Assert.assertEquals(iqamahTime, iqamahTimeResult);
    }

    private void setupDateTimeCalculatorMock(String azanTime, int[] azanTimeInt,
                                             String iqamahTime, int[] iqamahTimeInt) {
        Mockito.when(
                dateTimeCalculator.isValid24Time(Mockito.anyString()))
                .thenReturn(true);

        Mockito.when(
                dateTimeCalculator.hourMinuteStringToInt(azanTime))
                .thenReturn(azanTimeInt);

        Mockito.when(
                dateTimeCalculator.createCalendarFromTime(azanTimeInt[0], azanTimeInt[1]))
                .thenReturn(this.createCalendarFromTime(azanTimeInt[0], azanTimeInt[1]));

        Mockito.when(dateTimeCalculator.hourMinuteIntToString(iqamahTimeInt))
                .thenReturn(iqamahTime);
    }


    public Calendar createCalendarFromTime(int hour24, int minute) {
        Calendar calendar = Calendar.getInstance();
        calendar.set(Calendar.YEAR, 2016);
        calendar.set(Calendar.MONTH, 0);
        calendar.set(Calendar.DATE, 1);
        calendar.set(Calendar.HOUR_OF_DAY, hour24);
        calendar.set(Calendar.MINUTE, minute);
        calendar.set(Calendar.SECOND, 0);
        calendar.set(Calendar.MILLISECOND, 0);
        return calendar;
    }
}