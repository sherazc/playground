import React, { Component } from 'react';
import SalatTime from "./services/SalatTime";
import ScreenBuilder, {styles} from "./ui/ScreenBuilder";
import TimeHandler from "./services/TimeHandler";

import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import Alert from "./ui/Alert";

let serviceUrl = 'http://dashboard.masjidhamzah.com/salat_time.php';
let salatTime = new SalatTime(serviceUrl);
let screenBuilder = new ScreenBuilder();

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: screenBuilder.buildScreen(null,
                "Loading...",
                "",
                styles.screenDark,
                styles.textExtraLargeLight,
                styles.textLight),
            azanCalled: false,
            salatDone: false,
            tappable: false,
            currentSalah: {},
            nextSalah: {}
        }
    }

    componentDidMount() {
        salatTime.reteriveTodaysSchedule(this.setSalahTimeInView.bind(this));
    }

    setSalahTimeInView(todaySalatTime) {
        if ("error" === todaySalatTime) {
            this.setState(screenBuilder.buildScreen(this.state.screen, `Error getting salah time from ${serviceUrl}`, null, styles.screenDark, null));
            return;
        }
        if (!todaySalatTime || !this.validateSalahTime(todaySalatTime)) {
            this.setState(screenBuilder.buildScreen(this.state.screen, `Invalid salah times received`, null, styles.screenDark, null));
            return;
        }
        this.timeHandler = new TimeHandler(todaySalatTime, this.state, this.setState.bind(this));
        //this.setState({tappable: true});
        //setInterval(this.updateScreen, 10000);
    }

    // TODO: externalize it; maybe create time validator
    validateSalahTime(todaySalatTime) {
        let allDatesAvailable = todaySalatTime.fajr_athan
            && todaySalatTime.fajr_iqama
            && todaySalatTime.thuhr_athan
            && todaySalatTime.thuhr_iqama
            && todaySalatTime.asr_athan
            && todaySalatTime.asr_iqama
            && todaySalatTime.maghrib_athan
            && todaySalatTime.maghrib_iqama
            && todaySalatTime.isha_athan
            && todaySalatTime.isha_iqama;
        
            // TODO: test ranges and instance of Date
            // TODO: test if all todaySalatTime are today's salah and iqmah time
            // maybe do it when fetching time from service and test if it is today's month and date

        return allDatesAvailable;
    }

    mainTapped() {
        if (!this.state.tappable) {
            return;
        }

        if (this.state.azanCalled) {
            //this.setState(screenBuilder.buildScreen(this.state.screen, "Azan Called", null, styles.screenRed, null));
            this.setState({azanCalled: false});
        } else {
            //this.setState(screenBuilder.buildScreen(this.state.screen, "Azan Not called", null, styles.screenGreen, null));
            this.setState({azanCalled: true});
        }
    }

    settings() {
        Alert.show("Alert", 'Setting Clicked!');
    }

    render() {
        return (
            <TouchableHighlight onPress={this.mainTapped.bind(this)} style={this.state.screen.style.background}>
                <View>
                    <TouchableHighlight onPress={this.settings}>
                        <Text style={styles.textLight}>
                            Settings
                        </Text>
                    </TouchableHighlight>
                    <Text style={this.state.screen.style.mainMessage}>
                        {this.state.screen.mainMessage}
                    </Text>
                    <Text style={this.state.screen.style.subMessage}>
                        {this.state.screen.subMessage}
                    </Text>
                    
                </View>
            </TouchableHighlight>
        );
    }
}

