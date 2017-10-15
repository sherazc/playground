import React, { Component } from 'react';
// import SalatTime from "./services/SalatTime";

import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

// let salatTime = new SalatTime('http://dashboard.masjidhamzah.com/salat_time.php');

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
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
            this.setState({
                screen: {
                    mainMessage: "Main Loading...",
                    style: {
                        background: styles.screenGreen,
                        //mainMessage: styles.textExtraLargeLight,
                        //subMessage: styles.textLight
                    }
    
                },
                azanCalled: false,
                
            });
        } else {
            this.setState({
                screen: {
                    style: {
                        background: styles.screenRed,
                        //mainMessage: styles.textExtraLargeLight,
                        //subMessage: styles.textLight
                    }
    
                },
                azanCalled: true,
                
            });
        }
        console.log("aaaaa");
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    screenRed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ec8683',
        padding: 10,
        alignSelf: 'stretch',

    },
    screenGreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#81d54f',
        padding: 10,
        alignSelf: 'stretch',
    },
    screenDark: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#111111',
        padding: 10,
        alignSelf: 'stretch',
    }, 
    textExtraLargeLight: {
        color: "#ffffff",
        fontSize: 30
    },
    textExtraLargeDark: {
        color: "#111111",
        fontSize: 24

    },
    textExtraLargeGray: {
        color: 24,
        fontSize: 24
    },
    textDark: {
        color: "#111111",
        fontSize: 12
    },
    textLight: {
        color: "#ffffff",
        fontSize: 12
    }
});