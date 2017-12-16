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

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainMessage: "Loading...",
            subMessage: "",
            azanCalledDateTime: null,
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
        });
    }

    getAzanCalledDateTime() {
        return this.state.azanCalledDateTime;
    }


    settings() {
        Alert.show("Alert", `Settings tapped ${new Date()}`);
    }

    render() {
        return (
            <TouchableHighlight onPress={this.mainTapped.bind(this)} style={mainStyles.screenRed}>
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