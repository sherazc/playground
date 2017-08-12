import React from "react";
import {View, Text, Button, Image, StyleSheet} from "react-native";

class Home extends React.Component {
    static navigationOptions = {
        drawerLabel: "Home Screen",
        drawerIcon: <Image
            source={require("./images/icon.png")}
            style={{width:20, height:20}}/>
    };

    render() {
        return(
            <View>
                <Text style={{fontSize: 20}}>Home View</Text>
                <Button title="Open Drawer" onPress={()=>{
                    this.props.navigation.navigate("DrawerOpen");
                }}/>
                <Button title="Close Drawer" onPress={()=>{
                    this.props.navigation.navigate("DrawerClose");
                }}/>
            </View>
        );
    }
}

class Screen1 extends React.Component {
    static navigationOptions = {
        drawerLabel: (
            <View style={{flex: 1, backgroundColor: "#caf34c", height:40}}>
                <Text>Screen 1 Right</Text>
            </View>
        ),
        drawerIcon: (
            <View style={{flex: 1, backgroundColor: "#f3b554"}}>
                <Text>Icon</Text>
            </View>
        )
    };
    render() {
        return(
            <View>
                <Text style={{fontSize: 20}}>Screen1 View</Text>
                <Button title="Open Drawer" onPress={()=>{
                    this.props.navigation.navigate("DrawerOpen");
                }}/>
                <Button title="Close Drawer" onPress={()=>{
                    this.props.navigation.navigate("DrawerClose");
                }}/>
            </View>
        );
    }
}

class Screen2 extends React.Component {
    render() {
        return(
            <View>
                <Text style={{fontSize: 20}}>Screen2 View</Text>
                <Button title="Open Drawer" onPress={()=>{
                    this.props.navigation.navigate("DrawerOpen");
                }}/>
                <Button title="Close Drawer" onPress={()=>{
                    this.props.navigation.navigate("DrawerClose");
                }}/>
            </View>
        );
    }
}

export {Home, Screen1, Screen2};