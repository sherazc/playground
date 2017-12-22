import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    Image
} from 'react-native';

import Alert from "./ui/Alert";
let {mainStyles, styles, landscapeStyle, portraitStyle} = require("./ui/MainStyles");
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
            alert: Constants.ALERT_BLACK,
            azanSalahStatus: Constants.AZAN_SALAH_STATUS.AZAN_NOT_CALLED,
            orientationStyle: portraitStyle
        };
    }

    componentDidMount() {
        startAzanProcess(this.updateAzanMessage.bind(this), this.getAzanCalledDateTime.bind(this));
    }

    mainTapped() {
        this.setState({azanCalledDateTime: DateCreator.now()});
    }

    updateOrientation() {
        const {width, height} = Dimensions.get('window');
        this.setState({orientationStyle: width > height ? landscapeStyle : portraitStyle});
    }

    updateAzanMessage(uiMessageResult) {
        this.setState({
            mainMessage: uiMessageResult.mainMessage,
            subMessage: uiMessageResult.subMessage,
            alert: uiMessageResult.alert,
            azanSalahStatus: uiMessageResult.azanSalahStatus
        });
    }

    getAzanCalledDateTime() {
        return this.state.azanCalledDateTime;
    }

    render() {
        return (
            <TouchableHighlight style={[styles.wrapper]} onPress={this.mainTapped.bind(this)}>
                <View style={[this.state.orientationStyle.container]} onLayout={this.updateOrientation.bind(this)}>
                    <View style={[this.state.orientationStyle.box, {backgroundColor: "#af12ea"}]}>
                        <Image source={require("./ui/images/azan_called.png")}
                               style={{width: 100, height: 100}}/>
                    </View>
                    <View style={[this.state.orientationStyle.box, {backgroundColor: "#afa8ea"}]}>
                        <Text>
                            {this.state.mainMessage}
                        </Text>
                        <Text>
                            {this.state.subMessage}
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
