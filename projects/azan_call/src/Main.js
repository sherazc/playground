import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
    Dimensions,
    Image
} from 'react-native';

const dataStore = require("./storage/DataStore");
let {
    styles,
    landscapeStyle,
    portraitStyle,
    styleAzanNotCalled,
    styleAzanCalled,
    styleSalahInProgress,
    styleNextSalah,
} = require("./ui/MainStyles");
let DateCreator = require("./services/date/DateCreator");
let startAzanProcess = require("./services/startAzanProcess");
const Constants = require("./services/Constants");

// image icons
let imageAzanNotCalled = require("./ui/images/azan_not_called.png");
let imageAzanCalled = require("./ui/images/azan_called.png");
let imageSalahInProgress = require("./ui/images/salah_in_progress_b.png");
let imageNextSalah = require("./ui/images/next_salah.png");

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
        dataStore.get(dataStore.DATA_KEYS.AZAN_CALLED_DATETIME, this.setAzanCalledDateTimeISOString.bind(this));
    }

    componentDidMount() {
        startAzanProcess(this.updateAzanMessage.bind(this), this.getAzanCalledDateTime.bind(this));
    }

    // this method gets called when restoring time by dataStore
    setAzanCalledDateTimeISOString(error, azanCalledDateTimeISOString) {
        let azanCalledDateTime = DateCreator.fromISO(azanCalledDateTimeISOString);
        this.setState({azanCalledDateTime});
    }

    mainTapped() {
        let currentDataTime = DateCreator.now();
        dataStore.store(dataStore.DATA_KEYS.AZAN_CALLED_DATETIME, currentDataTime.toISOString());
        this.setState({azanCalledDateTime: currentDataTime});
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

    makeUndoButton(azanCalledDateTime) {
        if (azanCalledDateTime) {
            return (
                <TouchableHighlight onPress={this.undoAzanTime.bind(this)}>
                    <Image source={require("./ui/images/undo.png")} style={{width: 50, resizeMode: "contain"}}/>
                </TouchableHighlight>
            );
        }
    }

    render() {
        let azanSalahImage = undefined;
        let azanCalledMethod = undefined;
        let azanStatusStyle = styleNextSalah;

        switch(this.state.azanSalahStatus) {
            case Constants.AZAN_SALAH_STATUS.AZAN_NOT_CALLED:
                azanSalahImage = imageAzanNotCalled;
                azanCalledMethod = this.mainTapped.bind(this);
                azanStatusStyle = styleAzanNotCalled;
                break;
            case Constants.AZAN_SALAH_STATUS.AZAN_CALLED:
                azanSalahImage = imageAzanCalled;
                azanStatusStyle = styleAzanCalled;
                break;
            case Constants.AZAN_SALAH_STATUS.SALAH_IN_PROGRESS:
                azanSalahImage = imageSalahInProgress;
                azanStatusStyle = styleSalahInProgress;
                break;
            case Constants.AZAN_SALAH_STATUS.SALAH_DONE:
                azanSalahImage = imageNextSalah;
                azanStatusStyle = styleNextSalah;
                break;
        }

        return (
            <TouchableHighlight style={[styles.wrapper]} onPress={azanCalledMethod}>
                <View style={[this.state.orientationStyle.container, azanStatusStyle.container]} onLayout={this.updateOrientation.bind(this)}>
                    <View style={[this.state.orientationStyle.box, ]}>
                        <Image source={azanSalahImage} style={{resizeMode: "contain"}}/>
                    </View>
                    <View style={[this.state.orientationStyle.box]}>
                        <Text style={[azanStatusStyle.mainMessage, styles.mainMessage]}>
                            {this.state.mainMessage}
                        </Text>
                        <Text style={[azanStatusStyle.subMessage, styles.subMessage]}>
                            {this.state.subMessage}
                        </Text>
                        {this.makeUndoButton(this.state.azanCalledDateTime)}
                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}
