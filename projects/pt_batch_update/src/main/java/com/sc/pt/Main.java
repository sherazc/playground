package com.sc.pt;

import com.sc.pt.batch.PtBatchUpdate;
import com.sc.pt.io.TxtFileReader;

import java.util.List;

public class Main {
    public static void main(String[] args) {
        new Main().run(args);
    }

    private void run(String[] command) {
        validateCommand(command);
        if (command != null && command.length > 5) {
            PtBatchUpdate ptBatchUpdate = new PtBatchUpdate();
            List<String> lines = new TxtFileReader().readLines(command[1]);
            List<String> changedLines = null;

            if ("add".equalsIgnoreCase(command[0])) {
                changedLines = ptBatchUpdate.addMinutes(
                        lines, command[2], command[3], Integer.parseInt(command[4]), Integer.parseInt(command[5]));

            } else if ("fix".equalsIgnoreCase(command[0])) {
                changedLines = ptBatchUpdate.fixDate(lines, command[2], command[3], Integer.parseInt(command[4]), command[5]);
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

    private void validateCommand(String[] command) {
        // TODO implement it.
    }


}