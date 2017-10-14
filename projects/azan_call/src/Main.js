import React, { Component } from 'react';
import SalatTime from "./services/SalatTime";

import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

let salatTime = new SalatTime('http://dashboard.masjidhamzah.com/salat_time.php');

let todaySalatTime = { 
    "id": "287", 
    "prayer_date": "2013-10-14", 
    "fajr_athan": "0000-00-00 06:33:00", 
    "fajr_iqama": "0000-00-00 06:50:00", 
    "thuhr_athan": "0000-00-00 13:24:00", 
    "thuhr_iqama": "0000-00-00 14:00:00", 
    "asr_athan": "0000-00-00 16:38:00", 
    "asr_iqama": "0000-00-00 17:45:00", 
    "maghrib_athan": "0000-00-00 19:06:00", 
    "maghrib_iqama": "5 Min", 
    "isha_athan": "0000-00-00 20:15:00", 
    "isha_iqama": "0000-00-00 20:45:00", 
    "shurooq": "0000-00-00 07:40:00", 
    "maghrib_change": "0000-00-00 19:05:00", 
    "maghrib_change_date": "2017-10-15", 
    "asr_change": "0000-00-00 17:30:00", 
    "asr_change_date": "2017-10-17", 
    "isha_change": "0000-00-00 20:30:00", 
    "isha_change_date": "2017-10-17", 
    "fajr_change": "0000-00-00 07:00:00", 
    "fajr_change_date": "2017-10-20" 
}


let screens = {

}

let screen = (screenStyle, mainMessage, subMessage) => {
    return {
        screenStyle, mainMessage, subMessage
    };
}



export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenColor: styles.buttonRed
        }
    }
    componentDidMount() {
        // salatTime.reteriveTodaysSchedule();
    }

    updateScreen() {
        this.setState({
            screenColor: styles.buttonGreen
        });
    }

    render() {
        return (
            <TouchableHighlight
                style={styles.screenRed} 
                onPress={this.updateScreen.bind(this)}>
                <Text style={styles.textExtraLargeLight}>
                    Asr Azan Not Called
                </Text>
            </TouchableHighlight>

        
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenRed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ec8683',
        padding: 10,
        alignSelf: 'stretch',

    },
    screenGreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#81d54f',
        padding: 10,
        alignSelf: 'stretch',
    },
    screenBlack: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f1db',
        padding: 10,
        alignSelf: 'stretch',
    }, 
    textExtraLargeLight: {
        color: "#ffffff",
        fontSize: 30
    },
    textExtraLargeDark: {
        color: "#111111",
        fontSize: 24

    },
    textExtraLargeGray: {
        color: 24,
        fontSize: 24
    },
    textDark: {
        color: "#111111",
        fontSize: 12
    }
});