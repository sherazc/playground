import React, { Component } from 'react';
import SalatTime from "./services/SalatTime";

import {
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

let salatTime = new SalatTime('http://dashboard.masjidhamzah.com/salat_time.php');


let screens = {
    
}

let screen = (screenStyle, mainMessage, subMessage) => {
    return {
        screenStyle, mainMessage, subMessage
    };
} 



export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            screenColor: styles.buttonRed
        }
    }
    componentDidMount() {
        // salatTime.reteriveTodaysSchedule();
    }

    updateScreen() {
        this.setState({
            screenColor: styles.buttonGreen
        });
    }

    render() {
        return (
            <View style={this.state.screenColor}>
                <TouchableHighlight onPress={this.updateScreen.bind(this)}>
                    <Text>Testing</Text>
                </TouchableHighlight>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ec8683',
        padding: 10,
        alignSelf: 'stretch',

    },
    buttonGreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#81d54f',
        padding: 10,
        alignSelf: 'stretch',
    },
    result: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f1db',
        padding: 10,
        alignSelf: 'stretch',
    },
    textButton: {
        color: "#f6f6f6",
        fontSize: 24
    },
    textResult: {
        color: "#3e3e3e",
        fontSize: 24
    }
});