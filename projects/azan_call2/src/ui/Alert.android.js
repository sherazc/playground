import {
    ToastAndroid
} from 'react-native';

export default class Alert {
    static show(title, message) {
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }
} 