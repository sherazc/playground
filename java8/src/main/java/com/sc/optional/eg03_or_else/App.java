package com.sc.optional.eg03_or_else;
/*
Optional.orElse() is used as a default value
in-case of null.
*/
import java.util.Optional;

public class App {
    static class Computer {
        private Optional<String> soundCard;
        Computer(String soundCard) {
            this.soundCard = Optional.ofNullable(soundCard);
        }

        String getSoundCard() {
            return soundCard.orElse("No Sound Card");
        }
    }

    public static void main(String[] args) {
        Computer computerA = new Computer(null);
        Computer computerB = new Computer("Loud");

        System.out.println("Computer A Sound Card: " + computerA.getSoundCard());
        System.out.println("Computer B Sound Card: " + computerB.getSoundCard());
    }
}
