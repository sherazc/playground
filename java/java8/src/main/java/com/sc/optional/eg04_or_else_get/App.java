package com.sc.optional.eg04_or_else_get;

/*
Instead of Optional.orElse(), Optional.orElseGet() can be used if
we have to run multiple line of code to retrieve data and its not constant
in a variable.

Optional.orElseGet() takes in java.util.function.Supplier interface.
It's lambda takes in no arguments and return something.
*/

import java.util.Optional;

public class App {
    static class DataStore {
        boolean offlineMode;

        DataStore(boolean offlineMode) {
            this.offlineMode = offlineMode;
        }

        String getData() {
            return this.onlineData().orElseGet(() -> this.offlineData());
        }

        private Optional<String> onlineData() {
            String data = null;
            if (!offlineMode) {
                data = "Online Data";
            }
            return Optional.ofNullable(data);
        }

        private String offlineData() {
            return "Offline Data";
        }
    }

    public static void main(String[] args) {
        DataStore offlineDataStore = new DataStore(true);
        DataStore onlineDataStore = new DataStore(false);

        System.out.println(offlineDataStore.getData());
        System.out.println(onlineDataStore.getData());
    }
}
