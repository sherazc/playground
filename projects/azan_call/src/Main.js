import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import Alert from "./ui/Alert";
let mainStyles = require("./ui/MainStyles").mainStyles;

export default class Main extends Component {
    constructor(props) {
    }

    mainTapped() {
        Alert.show("Alert", `Main tapped ${new Date()}`);
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
                        Main Message
                    </Text>
                    <Text style={mainStyles.textLight}>
                        Sub Message
                    </Text>
                    
                </View>
            </TouchableHighlight>
        );
    }
}