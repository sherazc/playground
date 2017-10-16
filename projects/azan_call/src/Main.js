import React, { Component } from 'react';
import SalatTime from "./services/SalatTime";
import ScreenBuilder, {styles} from "./ui/ScreenBuilder";

import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import Alert from "./ui/Alert";


let salatTime = new SalatTime('http://dashboard.masjidhamzah.com/salat_time.php');
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
            currentSalah: {},
            nextSalah: {}
        }
    }

    componentDidMount() {
        salatTime.reteriveTodaysSchedule();
        setInterval(this.updateScreen, 10000);
        
    }



    updateScreen() {
        let currentTime = new Date();
        console.log("Working", currentTime);
    }

    mainTapped() {
        if (this.state.azanCalled) {
            this.setState(screenBuilder.buildScreen(this.state.screen, "Azan Called", null, styles.screenRed, null));
            this.setState({azanCalled: false});
        } else {
            this.setState(screenBuilder.buildScreen(this.state.screen, "Azan Not called", null, styles.screenGreen, null));
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

