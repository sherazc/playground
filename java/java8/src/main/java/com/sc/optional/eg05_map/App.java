package com.sc.optional.eg05_map;

/*
If we want to run this line of code:
String usbVersion = computer.getSoundCard().getUSB().getVersion();
And if the last get...() returns a null then return "No Sound Card USB Version"

Then we will have to do at least 3 null checks other wise we could get
NullPointerException. Look at getComputerSoundCardUsbVersionJava7() method

To avoid doing null check we can make Optional of Computer. And on every
get...() method which could potentially return null we could use
Optional.map(). And on else condition we can return "No Sound Card USB Version"
Look at getComputerSoundCardUsbVersionJava8Lambda()

In our example since we only call a get...() method on the
passed on argument, so we can use Method Reference.
Look at getComputerSoundCardUsbVersionJava8MethodReference()
*/
import java.util.Optional;

public class App {

    public static void main(String[] args) {
        USB usb = new USB("3.0");
        SoundCard soundCardA = new SoundCard(usb);
        SoundCard soundCardB = new SoundCard(null);
        Computer computerA = new Computer(soundCardA);
        Computer computerB = new Computer(soundCardB);
        Computer computerC = new Computer(null);

        System.out.println("========= Java 7");
        System.out.println("Computer A Sound card USB Version = " + getComputerSoundCardUsbVersionJava7(computerA));
        System.out.println("Computer B Sound card USB Version = " + getComputerSoundCardUsbVersionJava7(computerB));
        System.out.println("Computer C Sound card USB Version = " + getComputerSoundCardUsbVersionJava7(computerC));

        System.out.println("========= Java 8 Lambda");
        System.out.println("Computer A Sound card USB Version = " + getComputerSoundCardUsbVersionJava8Lambda(computerA));
        System.out.println("Computer B Sound card USB Version = " + getComputerSoundCardUsbVersionJava8Lambda(computerB));
        System.out.println("Computer C Sound card USB Version = " + getComputerSoundCardUsbVersionJava8Lambda(computerC));

        System.out.println("========= Java 8 Method Reference");
        System.out.println("Computer A Sound card USB Version = " + getComputerSoundCardUsbVersionJava8MethodReference(computerA));
        System.out.println("Computer B Sound card USB Version = " + getComputerSoundCardUsbVersionJava8MethodReference(computerB));
        System.out.println("Computer C Sound card USB Version = " + getComputerSoundCardUsbVersionJava8MethodReference(computerC));
    }


    private static String getComputerSoundCardUsbVersionJava7(Computer computer) {
        String usbVersion;
        if (computer.getSoundCard() != null
                && computer.getSoundCard().getUSB() != null
                && computer.getSoundCard().getUSB().getVersion() != null) {
            usbVersion = computer.getSoundCard().getUSB().getVersion();
        } else {
            usbVersion = "No Sound Card USB Version";
        }
        return usbVersion;
    }

    private static String getComputerSoundCardUsbVersionJava8Lambda(Computer computer) {
        return Optional.of(computer)
                .map(c -> c.getSoundCard())
                .map(s -> s.getUSB())
                .map(u -> u.getVersion())
                .orElse("No Sound Card USB Version");
    }

    private static String getComputerSoundCardUsbVersionJava8MethodReference(Computer computer) {
        return Optional.of(computer)
                .map(Computer::getSoundCard)
                .map(SoundCard::getUSB)
                .map(USB::getVersion)
                .orElse("No Sound Card USB Version");
    }

    static class Computer {
        SoundCard soundCard;
        Computer(SoundCard soundCard) {
            this.soundCard = soundCard;
        }

        SoundCard getSoundCard() {
            return this.soundCard;
        }
    }

    static class SoundCard {
        private USB usb;
        SoundCard(USB usb) {
            this.usb = usb;
        }

        USB getUSB() {
            return this.usb;
        }
    }

    static class USB {
        private String version;
        USB(String version) {
            this.version = version;
        }

        String getVersion() {
            return this.version;
        }
    }
}
