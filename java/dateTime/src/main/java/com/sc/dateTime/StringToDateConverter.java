package com.sc.dateTime;

import java.time.LocalDate;
import java.time.chrono.HijrahChronology;
import java.time.chrono.HijrahDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeFormatterBuilder;
import java.time.format.DecimalStyle;
import java.time.temporal.TemporalAccessor;
import java.util.Locale;

public class StringToDateConverter {

    public static final String DATE_PATTERN = "yyyy/MM/dd";
    private static final DateTimeFormatter localDateFormatter = DateTimeFormatter.ofPattern(DATE_PATTERN);

    private static DateTimeFormatter hijrahDateFormatter;

    static {
        Locale locale = Locale.getDefault(Locale.Category.FORMAT);
        hijrahDateFormatter = new DateTimeFormatterBuilder()
                .parseLenient()
                .appendPattern(DATE_PATTERN)
                .toFormatter()
                .withChronology(HijrahChronology.INSTANCE)
                .withDecimalStyle(DecimalStyle.of(locale));
    }

    public static HijrahDate stringToHijrahDate(String hijrahString) {
        TemporalAccessor temporalAccessor = hijrahDateFormatter.parse(hijrahString);
        return HijrahDate.from(temporalAccessor);
    }

    public static LocalDate stringToLocalDate(String localDateString) {
        TemporalAccessor temporalAccessor = localDateFormatter.parse(localDateString);
        return LocalDate.from(temporalAccessor);
    }

    public static void main(String[] args) {
        String hijrahString = "1400/10/22";
        String localDateString = "1980/09/02";

        HijrahDate hijrahDate = stringToHijrahDate(hijrahString);
        System.out.println(hijrahDate);

        LocalDate localDate = stringToLocalDate(localDateString);
        System.out.println(localDate);
    }
}
