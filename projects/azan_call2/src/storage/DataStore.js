const DATA_KEYS = {
    AZAN_CALLED_DATETIME: "AZAN_CALLED_DATETIME",
};

import {
    AsyncStorage
} from "react-native";

const store = (key, value) => {
    AsyncStorage.setItem(key, value);
};

const remove = (key) => {
    AsyncStorage.removeItem(key);
};

const get = (key, callback) => {
    AsyncStorage.getItem(key, callback);
};

module.exports = {store, remove, get, DATA_KEYS};