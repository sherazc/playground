package com.sc.dateTime;

import java.time.*;
import java.time.chrono.*;
import java.time.format.*;
import java.time.temporal.*;
import java.util.Locale;
import java.io.PrintStream;

public class StringConverter {
    /**
     * Converts a LocalDate (ISO) value to a ChronoLocalDate date
     * using the provided Chronology, and then formats the
     * ChronoLocalDate to a String using a DateTimeFormatter with a
     * SHORT pattern based on the Chronology and the current Locale.
     *
     * @param localDate - the ISO date to convert and format.
     * @param chrono - an optional Chronology. If null, then IsoChronology
     *                 is used.
     */
    public static String toString(LocalDate localDate, Chronology chrono) {
        if (localDate != null) {
            Locale locale = Locale.getDefault(Locale.Category.FORMAT);
            ChronoLocalDate cDate;
            if (chrono == null) {
                chrono = IsoChronology.INSTANCE;
            }
            try {
                cDate = chrono.date(localDate);
            } catch (DateTimeException ex) {
                System.err.println(ex);
                chrono = IsoChronology.INSTANCE;
                cDate = localDate;
            }
            String pattern = "M/d/yyyy GGGGG";
            DateTimeFormatter dateFormatter =
                    DateTimeFormatter.ofPattern(pattern);
            return dateFormatter.format(cDate);
        } else {
            return "";
        }
    }

    /**
     * Parses a String to a ChronoLocalDate using a DateTimeFormatter
     * with a short pattern based on the current Locale and the
     * provided Chronology, then converts this to a LocalDate (ISO)
     * value.
     *
     * @param text   - the input date text in the SHORT format expected
     *                 for the Chronology and the current Locale.
     *
     * @param chrono - an optional Chronology. If null, then IsoChronology
     *                 is used.
     */
    public static LocalDate fromString(String text, Chronology chrono) {
        if (text != null && !text.isEmpty()) {
            Locale locale = Locale.getDefault(Locale.Category.FORMAT);
            if (chrono == null) {
                chrono = IsoChronology.INSTANCE;
            }
            String pattern = "M/d/yyyy GGGGG";
            DateTimeFormatter df = new DateTimeFormatterBuilder().parseLenient()
                    .appendPattern(pattern)
                    .toFormatter()
                    .withChronology(chrono)
                    .withDecimalStyle(DecimalStyle.of(locale));
            TemporalAccessor temporal = df.parse(text);
            ChronoLocalDate cDate = chrono.date(temporal);
            return LocalDate.from(cDate);
        }
        return null;
    }

    public static void main(String[] args) {
        LocalDate date = LocalDate.of(1996, Month.OCTOBER, 29);
        System.out.printf("%s%n",
                StringConverter.toString(date, JapaneseChronology.INSTANCE));
        System.out.printf("%s%n",
                StringConverter.toString(date, MinguoChronology.INSTANCE));
        System.out.printf("%s%n",
                StringConverter.toString(date, ThaiBuddhistChronology.INSTANCE));
        System.out.printf("%s%n",
                StringConverter.toString(date, HijrahChronology.INSTANCE));


        System.out.printf("%s%n", StringConverter.fromString("10/29/0008 H",
                JapaneseChronology.INSTANCE));
        System.out.printf("%s%n",
                StringConverter.fromString("10/29/0085 1",
                        MinguoChronology.INSTANCE));
        System.out.printf("%s%n",
                StringConverter.fromString("10/29/2539 B.E.",
                        ThaiBuddhistChronology.INSTANCE));
        System.out.printf("%s%n",
                StringConverter.fromString("6/16/1417 1",
                        HijrahChronology.INSTANCE));
    }
}
