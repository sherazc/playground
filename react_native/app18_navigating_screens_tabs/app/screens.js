import React from "react";
import {View, Text} from "react-native";

class Home extends React.Component {
    render() {
        return(
            <View>
                <Text style={{fontSize: 20}}>Home View</Text>
            </View>
        );
    }
}

class Screen1 extends React.Component {
    render() {
        return(
            <View>
                <Text style={{fontSize: 20}}>Screen1 View</Text>
            </View>
        );
    }
}

class Screen2 extends React.Component {
    render() {
        return(
            <View>
                <Text style={{fontSize: 20}}>Screen2 View</Text>
            </View>
        );
    }
}

export {Home, Screen1, Screen2};