package com.sc.pt;

import com.sc.pt.batch.PtBatchUpdate;
import com.sc.pt.io.TxtFileReader;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        new Main().run(args);
    }

    private void run(String[] args) {
        if (args != null && args.length > 5) {
            PtBatchUpdate ptBatchUpdate = new PtBatchUpdate();
            // List<String> lines = new CsvReader().readLines(args[1]);
            List<String> lines = new TxtFileReader().readLines(args[1]);
            List<String> changedLines = null;

            if ("add".equalsIgnoreCase(args[0])) {
                changedLines = ptBatchUpdate.change(
                        lines, args[2], args[3], Integer.parseInt(args[4]), Integer.parseInt(args[5]));

            } else if ("fix".equalsIgnoreCase(args[0])) {
                changedLines = ptBatchUpdate.fixTime(lines, args[2], args[3], Integer.parseInt(args[4]), args[5]);
            }

            if (changedLines != null) {
                changedLines.forEach(System.out::println);
            }
        } else {
            System.out.println("Usage:");
            System.out.println(
                    "java -jar pt-batch.jar <command> <file name> <from date> <to date> <column - 0 is the first> <time/minutes>"
            );
            System.out.println("Example:");
            System.out.println(
                    "java -jar pt-batch.jar add /Users/sheraz/dev/playground/projects/pt_batch_update/src/main/resources/pt.txt 01/03 01/10 1 1"
            );
        }
    }


}