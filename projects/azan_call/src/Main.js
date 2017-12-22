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

    undoAzanTime() {
        this.setState({azanCalledDateTime: null});
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
        let azanSalahImage = require("./ui/images/azan_called.png");
        switch(this.state.azanSalahStatus) {
            case Constants.AZAN_SALAH_STATUS.AZAN_NOT_CALLED:
                azanSalahImage = require("./ui/images/azan_not_called.png");
                break;
            case Constants.AZAN_SALAH_STATUS.AZAN_CALLED:
                azanSalahImage = require("./ui/images/azan_called.png");
                break;
            case Constants.AZAN_SALAH_STATUS.SALAH_IN_PROGRESS:
                azanSalahImage = require("./ui/images/salah_in_progress_b.png");
                break;
            case Constants.AZAN_SALAH_STATUS.SALAH_DONE:
                azanSalahImage = require("./ui/images/next_salah.png");
                break;
        }


        return (
            <TouchableHighlight style={[styles.wrapper]} onPress={this.mainTapped.bind(this)}>
                <View style={[this.state.orientationStyle.container]} onLayout={this.updateOrientation.bind(this)}>
                    <View style={[this.state.orientationStyle.box, {backgroundColor: "#af12ea", }]}>
                        <Image source={azanSalahImage} style={{resizeMode: "contain"}}/>
                    </View>
                    <View style={[this.state.orientationStyle.box, {backgroundColor: "#afa8ea"}]}>
                        <Text>
                            {this.state.mainMessage}
                        </Text>
                        <Text>
                            {this.state.subMessage}
                        </Text>
                        <TouchableHighlight onPress={this.undoAzanTime.bind(this)}>
                            <Image source={require("./ui/images/undo.png")} style={{width: 50, resizeMode: "contain"}}/>
                        </TouchableHighlight>
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
