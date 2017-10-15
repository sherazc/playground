import React, { Component } from 'react';
// import SalatTime from "./services/SalatTime";
import ScreenBuilder, {styles} from "./ui/ScreenBuilder";

import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

// let salatTime = new SalatTime('http://dashboard.masjidhamzah.com/salat_time.php');
let screenBuilder = new ScreenBuilder();

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screen: ,
            screen: {
                mainMessage: "Main Loading...",
                subMessage: "Sub Loading...",
                style: {
                    background: styles.screenDark,
                    mainMessage: styles.textExtraLargeLight,
                    subMessage: styles.textLight
                }

            },
            azanCalled: false,
            salatDone: false,
            currentSalah: {},
            nextSalah: {}
        }
    }

    componentDidMount() {
        // salatTime.reteriveTodaysSchedule();
    }

    mainTapped() {
        if (this.state.azanCalled) {
            this.updateScreen({
                screen: {
                    style: {
                        background: styles.screenGreen,
                    }
    
                },
                azanCalled: false
            });
        } else {
            this.setState({
                screen: {
                    style: {
                        background: styles.screenRed
                    }
    
                },
                azanCalled: true
            });
        }
        console.log("aaaaa");
    }


    updateScreen(changedElements) {
        this.setState((previousState, props) => {
            return changedElements;
        });
    }

    settings() {
        console.log("bbbb");
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

