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
import OrientationDetector, {ORIENTATION} from "./ui/OrientationDetector"
let mainStyles = require("./ui/MainStyles").mainStyles;
let DateCreator = require("./services/date/DateCreator");
let startAzanProcess = require("./services/startAzanProcess");
const Constants = require("./services/Constants");

let orientationDetector = new OrientationDetector();

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainMessage: "Loading...",
            subMessage: "",
            azanCalledDateTime: null,
            alert: Constants.ALERT_BLACK,
            azanSalahStatus: Constants.AZAN_SALAH_STATUS.AZAN_NOT_CALLED
        };
    }

    componentDidMount() {
        startAzanProcess(this.updateAzanMessage.bind(this), this.getAzanCalledDateTime.bind(this));
    }

    mainTapped() {
        this.setState({azanCalledDateTime: DateCreator.now()});
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

        console.log(orientationDetector.orientation);
        console.log(this.state.azanSalahStatus, new Date());
        let style = portraitStyle;
        if (orientationDetector.orientation == ORIENTATION.LANDSCAPE) {
            style = landscapeStyle;
        }

        return (
            <TouchableHighlight onLayout={orientationDetector.detectOrientation.bind(orientationDetector)}
                                style={[style.parent]}
                                onPress={this.mainTapped.bind(this)}>

                <View>
                    <View style={[style.child, {backgroundColor: "#af12ea"}]}>
                        <Image source={require("./ui/images/azan_called.png")}
                               style={{width: 100, height: 100}}/>
                    </View>
                    <View style={[style.child, {backgroundColor: "#afa8ea"}]}>
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

let landscapeStyle = StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'row',
        //flexWrap: 'wrap',
        width: "100%",
        backgroundColor: "#F599FF",
    },
    child: {
        width: "100%",
        //height: '100%',
        flex: 1,
        //aspectRatio: 1,
        padding: 10,
        //margin: 10,
    }
});

let portraitStyle = StyleSheet.create({
    parent: {
        flex: 1,
        flexDirection: 'column',
        //flexWrap: 'wrap'
    },
    child: {
        width: "100%",
        height: '50%',

        //aspectRatio: 1,
        padding: 10,
        //margin: 10,
    }
});

//let style = portraitStyle;
//let style = landscapeStyle;