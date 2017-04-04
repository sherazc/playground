package com.sc.optional.eg07_filter;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

public class App {

    public static void main(String[] args) {
        List<Computer> computers = Arrays.asList(
                createComputer("Modal A", "i7", HardDriveType.SSD, 500),
                createComputer("Modal B", "i5", HardDriveType.MAGNETIC, null),
                createComputer("Modal C", null, null, 1000),
                createComputer("Modal D", "i7", HardDriveType.SSD, null),
                createComputer("Modal E", "i5", HardDriveType.SSD, 250),
                createComputer("Modal F", "i5", null, null)
                );

        computers.stream().map(c -> c);

        computers.stream().filter(c -> {
            Optional.of(c).map(computerOptional -> computerOptional.hardDrive).filter(h -> h.capacity > 250);
            return true;
        });


    }

    // ========= Helper Methods

    // Helper method to create Computer
    private static Computer createComputer(String modalName, String cpuName,
                                           HardDriveType hardDriveType, Integer hardDriveCapacity) {
        Cpu cpu = null;
        HardDrive hardDrive = null;

        if (hardDriveType != null || hardDriveCapacity != null) {
            hardDrive = new HardDrive(hardDriveType, hardDriveCapacity);
        }

        if (cpuName != null) {
            cpu = new Cpu(cpuName);
        }

        return new Computer(modalName, cpu, hardDrive);
    }


    // Helper method to print Computer
    private static void printComputer(Computer computer) {
        Optional<Computer> computerOptional = Optional.of(computer);

        computerOptional.map(c -> c.modal).ifPresent(m -> System.out.print("Modal: " + m + ", "));
        computerOptional.map(c -> c.cpu).map(cpu -> cpu.name).ifPresent(cpuName -> System.out.print("CPU Name: " + cpuName + ", "));

        if (computer.hardDrive != null) {
            System.out.print("Hard Drive: ");
            //if ()
        }
    }

    // ========= Modal Classes
    static class Computer {
        String modal;
        Cpu cpu;
        HardDrive hardDrive;
        Computer(String modal, Cpu cpu, HardDrive hardDrive) {
            this.modal = modal;
            this.cpu = cpu;
            this.hardDrive = hardDrive;
        }
    }

    static class Cpu {
        String name;
        Cpu(String name) {
            this.name = name;
        }
    }

    static class HardDrive {
        HardDriveType hardDriveType;
        Integer capacity;

        HardDrive(HardDriveType hardDriveType, Integer capacity) {
            this.hardDriveType = hardDriveType;
            this.capacity = capacity;
        }
    }

    enum HardDriveType {
        MAGNETIC, SSD;
    }
}
