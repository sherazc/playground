package com.sc.pt;

import com.sc.pt.io.TxtFileReader;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class ConvertAmPmTo24 {
    public static void main(String[] args) throws Exception {
        new ConvertAmPmTo24().run(args);
    }

    private void run(String[] command) throws Exception {
        if (command.length < 1) {
            System.out.println("Sample Command:");
            System.out.println("java -cp pt-batch.jar com.sc.pt.ConvertAmPmTo24 maghrib_ampm.txt");
            return;
        }
        List<String> lines = new TxtFileReader().readLines(command[0], false);
        SimpleDateFormat displayFormat = new SimpleDateFormat("HH:mm");
        SimpleDateFormat parseFormat = new SimpleDateFormat("hh:mm a");
        for (int i = 0; i < lines.size(); i++) {
            String line = lines.get(i);
            String lineNumber = String.format("%03d", i + 1);
            Date date = parseFormat.parse(line.trim());
            System.out.println(lineNumber + " = " + parseFormat.format(date) + " = " + displayFormat.format(date));
        }
    }
}
