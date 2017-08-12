import React from "react";
import {View, Text, Button, TextInput} from "react-native";

export default class Home extends React.Component {
    static navigationOptions = {
        title: "Home",
        headerLeft: <Button title= "=" />,
        headerRight: <Button title= ":" />
    };

    render() {
        const {navigate} = this.props.navigation;
        return(
            <View>
                <Text>
                    Home Screen
                </Text>
                <Button
                    title="Screen 01"
                    onPress={()=>{navigate("Screen01", {myName: "Sheraz"})}}/>
                <Button
                    title="Screen 02"
                    onPress={()=>{navigate("Screen02", {})}}/>
            </View>
        );
    }
}