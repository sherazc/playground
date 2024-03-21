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
            String guide = """
                    PRAYER TIME - BATCH UPDATE
                    This command only prints out modified content.
                    To put the output in a file use bash >> operator.
                    ###########
                    usage:
                    java -jar pt-batch.jar <command> <file name> <from date> <to date> <column - 0 is the first> <time/minutes>\s
                    ###########
                    Commands: add fix
                    ###########
                    Columns:
                    0  = Date
                    1  = Fajr,
                    2  = Fajr Iqama,
                    3  = Dhuhr,
                    4  = Dhuhr Iqama,
                    5  = Asr,
                    6  = Asr Iqama,
                    7  = Maghrib,
                    8  = Maghrib Iqama,
                    9  = Isha,
                    10 = Isha Iqama,
                    11 = Sunrise
                    ###########
                    Example, To add 1 min to maghrib time:
                    java -jar \\
                        pt-batch.jar \\
                        add \\
                        mdb_prayers_20240310_Hamzah_Islamic_Center.txt \\
                        01/01 12/31 \\
                        7 1 >> mdb_prayers_20240310_Hamzah_Islamic_Center_update_time.txt
                    ###########
                    """;

            System.out.println(guide);
        }
    }

    private void validateCommand(String[] command) {
        // TODO implement it.
    }


}