package com.sc.optional.eg06_flatmap;

/*
Optional.flatMap() works exactly like Optional.map().
The difference is that: Optional.flatMap() is used when
return type is another optional.

Look at Computer.getSoundCard() returns Optional<SoundCard>
and SoundCard.getUSB() returns Optional<USB>. But
USB.getVersion() still returns a String.

Now look at getComputerSoundCardUsbVersionJava8Lambda() or
getComputerSoundCardUsbVersionJava8MethodReference(). They
have 2 calls to flatMap() and 1 call to map().
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

        System.out.println("========= Java 8 Lambda");
        System.out.println("Computer A Sound card USB Version = " + getComputerSoundCardUsbVersionJava8Lambda(computerA));
        System.out.println("Computer B Sound card USB Version = " + getComputerSoundCardUsbVersionJava8Lambda(computerB));
        System.out.println("Computer C Sound card USB Version = " + getComputerSoundCardUsbVersionJava8Lambda(computerC));

        System.out.println("========= Java 8 Method Reference");
        System.out.println("Computer A Sound card USB Version = " + getComputerSoundCardUsbVersionJava8MethodReference(computerA));
        System.out.println("Computer B Sound card USB Version = " + getComputerSoundCardUsbVersionJava8MethodReference(computerB));
        System.out.println("Computer C Sound card USB Version = " + getComputerSoundCardUsbVersionJava8MethodReference(computerC));
    }


    private static String getComputerSoundCardUsbVersionJava8Lambda(Computer computer) {
        return Optional.of(computer)
                .flatMap(c -> c.getSoundCard())
                .flatMap(s -> s.getUSB())
                .map(u -> u.getVersion())
                .orElse("No Sound Card USB Version");
    }

    private static String getComputerSoundCardUsbVersionJava8MethodReference(Computer computer) {
        return Optional.of(computer)
                .flatMap(Computer::getSoundCard)
                .flatMap(SoundCard::getUSB)
                .map(USB::getVersion)
                .orElse("No Sound Card USB Version");
    }

    static class Computer {
        private Optional<SoundCard> soundCard;
        Computer(SoundCard soundCard) {
            this.soundCard = Optional.ofNullable(soundCard);
        }

        Optional<SoundCard> getSoundCard() {
            return this.soundCard;
        }
    }

    static class SoundCard {
        private Optional<USB> usb;
        SoundCard(USB usb) {
            this.usb = Optional.ofNullable(usb);
        }

        Optional<USB> getUSB() {
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
