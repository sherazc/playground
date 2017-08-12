import React from "react"
import {Text, Image, Button, View, StyleSheet, TouchableHighlight} from "react-native"
import {StackNavigator, TabNavigator, DrawerNavigator} from "react-navigation";

const drawerNavigationOptionInbox = ({navigation}) => {
    return {
        title: "Inbox",
        drawerLabel: "Inbox (0)",
        drawerIcon: <Image source={require("./images/icon1.png")} style={{width:20, height:20}}/>,
        headerLeft:
            <TouchableHighlight onPress={() => {navigation.navigate("DrawerOpen")}} style={{width: 30}}>
                <Image source={require("./images/icon2.png")} style={{width:30}}/>
            </TouchableHighlight>,
    }
};

const drawerNavigationOptionSent = ({navigation}) => {
    return {
        title: "Sent",
        drawerLabel: "Sent (0)",
        drawerIcon: <Image source={require("./images/icon3.png")} style={{width:20, height:20}}/>,
        headerLeft:
            <TouchableHighlight onPress={() => {navigation.navigate("DrawerOpen")}} style={{width: 30}}>
                <Image source={require("./images/icon2.png")} style={{width:30}}/>
            </TouchableHighlight>,
    }
};

const drawerNavigationOptionSetting = ({navigation}) => {
    return {
        title: "Settings",
        drawerLabel: "View Settins",
        drawerIcon: <Image source={require("./images/icon3.png")} style={{width:20, height:20}}/>,
        headerLeft:
            <TouchableHighlight onPress={() => {navigation.navigate("DrawerOpen")}} style={{width: 30}}>
                <Image source={require("./images/icon2.png")} style={{width:30}}/>
            </TouchableHighlight>,
    }
};

class ScreenInbox extends React.Component {
    static navigationOptions = drawerNavigationOptionInbox;
    render() {
        return(
            <View>
                <Text>New Email List 1</Text>
                <Text>New Email List 2</Text>
                <Text>New Email List 3</Text>
                <Button title="View New Mail" onPress={()=>{
                    this.props.navigation.navigate("ScreenViewMail", {viewMailTitle: "New Email"});
                }}/>
            </View>
        );
    }
}

class ScreenSentMail extends React.Component {
    static navigationOptions = drawerNavigationOptionSent;
    render() {return(
        <View>
            <Text>Sent Email List 1</Text>
            <Text>Sent Email List 2</Text>
            <Text>Sent Email List 3</Text>
            <Button title="View Sent Mail" onPress={()=>{
                this.props.navigation.navigate("ScreenViewMail", {viewMailTitle: "Sent Email"});
            }}/>
        </View>
    );}
}

class ScreenViewMail extends React.Component {
    static navigationOptions = ({navigation}) => {
        return {
            title: "View " + navigation.state.params.viewMailTitle
        };
    };
    render() {return(
        <View>
            <Text>From: sender@email.com</Text>
            <Text>To: receiver@email.com</Text>
            <Text>Subject: Important message</Text>
            <Text>Hi,</Text>
            <Text>Work Hard.</Text>
            <Text>Thank you,</Text>
            <Text>Sender</Text>
        </View>
    );}
}

class ScreenSettingAccount extends React.Component {
    static navigationOptions = drawerNavigationOptionSetting;

    render() {return(
        <View>
            <Text>Account Settings Screen</Text>
        </View>
    );}
}

class ScreenSettingGeneral extends React.Component {
    static navigationOptions = drawerNavigationOptionSetting;

    render() {return(
        <View>
            <Text>General Settings Screen</Text>
        </View>
    );}
}


const TabSetting = TabNavigator({
    ScreenAccount: {screen: ScreenSettingAccount},
    ScreenGeneral: {screen: ScreenSettingGeneral},
});

const StackInbox = StackNavigator({
    ScreenInbox: {screen: ScreenInbox},
    ScreenViewMail: {screen: ScreenViewMail},
});

const StackSentMail = StackNavigator({
    ScreenSentMail: {screen: ScreenSentMail}
});

const StackSetting = StackNavigator({
    ScreenSetting: {screen: TabSetting}
});


const DrawerMainMail = DrawerNavigator({
    StackInbox: {screen: StackInbox},
    StackSentMail: {screen: StackSentMail},
    StackSetting: {screen: StackSetting},
});



export default class App extends React.Component {
    render() {
        return(
            <View style={{flex: 1}}>
                <DrawerMainMail/>
            </View>
        );
    }
}