import React from "react";
import {View, Text, Button} from "react-native";

export default class Screen01 extends React.Component {
    // To obtaining previous screen data in navigationOptions
    // Instead of defining navigationOptions as a static object
    // we define it as function that return an object
    // and get value from navigation.state.params.
    static navigationOptions = ({navigation}) => {
        return ({
            title: "Screen 01 " + navigation.state.params.myName,
        });
    };

    render() {
        const {navigate} = this.props.navigation;
        // Or we can get it from this.props.navigation.state.params.
        let myNameValue = this.props.navigation.state.params.myName;
        return (
            <View>
                <Text>Screen 01 {myNameValue}</Text>
                <Button
                    title="Screen 02"
                    onPress={() => {navigate("Screen02", {})}}/>
            </View>
        );
    }
}
