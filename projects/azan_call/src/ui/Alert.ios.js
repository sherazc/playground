import {
    AlertIOS
} from 'react-native';

export default class Alert {
    static show(title, message) {
        let alertTitle = "Alert";
        if (title) {
            alertTitle = title;
        }
        AlertIOS.alert(alertTitle,'All your data are belong to us.');
    }
} 