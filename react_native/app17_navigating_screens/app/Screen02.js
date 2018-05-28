import React from "react";
import {View, Text, Button} from "react-native";

export default class Screen02 extends React.Component {
    static navigationOptions = {
        title: "Screen 02"
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <Text>Screen 02</Text>
                <Button
                    title="Home"
                    onPress={()=>{navigate("Home", {})}}/>
            </View>

        );
    }
}
