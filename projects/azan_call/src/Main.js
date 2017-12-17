import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import Alert from "./ui/Alert";
let mainStyles = require("./ui/MainStyles").mainStyles;
let DateCreator = require("./services/date/DateCreator");
let startAzanProcess = require("./services/startAzanProcess");
const Constants = require("./services/Constants");

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainMessage: "Loading...",
            subMessage: "",
            azanCalledDateTime: null,
            alert: Constants.ALERT_BLACK
        };
    }

    componentDidMount() {
        startAzanProcess(this.updateAzanMessage.bind(this), this.getAzanCalledDateTime.bind(this));
    }

    mainTapped() {
        this.setState({azanCalledDateTime: DateCreator.now()}, () => {
            //Alert.show("Alert", `Main tapped azanCalledDateTime ${this.state.azanCalledDateTime}`);
        });
    }


    updateAzanMessage(uiMessageResult) {
        this.setState({
            mainMessage: uiMessageResult.mainMessage,
            subMessage: uiMessageResult.subMessage,
            alert: uiMessageResult.alert
        });
    }

    getAzanCalledDateTime() {
        return this.state.azanCalledDateTime;
    }


    settings() {
        Alert.show("Alert", `Settings tapped ${new Date()}`);
    }

    render() {

        let backgroundStyle = mainStyles.screenDark;
        switch(this.state.alert) {
            case Constants.ALERT_BLACK:
                backgroundStyle = mainStyles.screenDark;
                break;
            case Constants.ALERT_RED:
                backgroundStyle = mainStyles.screenRed;
                break;
            case Constants.ALERT_GREEN:
                backgroundStyle = mainStyles.screenGreen;
                break;
            default:
        }

        return (
            <TouchableHighlight onPress={this.mainTapped.bind(this)} style={backgroundStyle}>
                <View>
                    <TouchableHighlight onPress={this.settings}>
                        <Text style={mainStyles.textLight}>
                            Settings
                        </Text>
                    </TouchableHighlight>
                    <Text style={mainStyles.textExtraLargeLight}>
                        {this.state.mainMessage}
                    </Text>
                    <Text style={mainStyles.textLight}>
                        {this.state.subMessage}
                    </Text>
                </View>
            </TouchableHighlight>
        );
    }
}