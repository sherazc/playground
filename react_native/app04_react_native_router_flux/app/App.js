import React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

import {Router, Scene, Actions} from "react-native-router-flux";

export default class App extends React.Component {
    render() {
        return (
        /*
        We need to list all the screen
        */
        <Router>
            <Scene key="root">
                {/*By default first scene is initial. But if its not first in the code
                then we can do "initial={true}" or just "initial" to make it the first
                This is actually is ES6/JSX feature that we don't to specify value
                if it is true.
                */}

                {/*
                Key of each scene will become a function that we can use it
                with Actions. e.g. Actions.home() to navigate to Home screen
                */}
                <Scene key="home" component={HomeScreen} title="Home" initial={true}/>
                <Scene key="red" component={RedScreen} title="Red"/>
                {/*
                We can pass custom props to Scene.
                e.g. userName in the tag below
                */}
                <Scene key="blue" component={BlueScreen} title="Blue" userName="Sheraz"/>
            </Scene>
        </Router>
        );
    }
}

// ------------- Start Screens -------------
let HomeScreen = (props) => {
    return (
        <View style={styles.containerHome}>
            <Text style={styles.bigTextLight}
                onPress={() => {
                    /*
                    Action are used with an object to pass any props
                    to a component that is used in <Scene/>
                    */
                    Actions.red({
                       num1: 10,
                       num2: 20
                    });
                }}>
                Home Screen
            </Text>
        </View>
    );
};

let RedScreen = (props) => {
    return (
        <View style={styles.containerRed}>
            <Text style={styles.bigTextLight}
                  onPress={() => {
                    Actions.blue();
                }}>
                Red Screen
            </Text>
            <Text style={styles.bigTextLight}>
                {/*
                These props are coming from Action.red() call
                */}
                {props.num1} + {props.num2} = {props.num1 + props.num2}
            </Text>
        </View>
    );
};

let BlueScreen = (props) => {
    return (
        <View style={styles.containerBlue}>
            <Text style={styles.bigTextLight}
                  onPress={() => {
                    Actions.home();
                }}>
                Blue Screen
            </Text>
            <Text style={styles.bigTextLight}>
                {/*
                 These props are coming from <Scene/> tag
                 */}
                Hi {props.userName}
            </Text>
        </View>
    );
};
// ------------- End Screens -------------

// ------------- Start Styles -------------
let containerCommon = {
    flex: 1
};

let commonText = {
    fontFamily: "Georgia",
};

let centerItems = {alignItems: "center", justifyContent: "center"};

let centerText = {textAlign: "center"};

let styles = StyleSheet.create({
    containerHome: {...containerCommon, ...centerItems, backgroundColor: "#2a5f75"},
    containerRed: {...containerCommon, ...centerItems, backgroundColor: "#9d3833"},
    containerBlue: {...containerCommon, ...centerItems, backgroundColor: "#1e2280"},
    bigTextLight: {...commonText, ...centerText, color: "#fdfdfd", fontSize: 50},
    bigTextDark: {...commonText, ...centerText, color: "#292929", fontSize: 50},
    buttonText: {...commonText, ...centerText, fontSize: 20, color:"#eeeeee"},
    button: {backgroundColor: "#7a9abe", padding: 15, borderWidth: 1, borderColor: "#455b78", borderRadius: 2, margin:5},
});
// ------------- End Styles -------------
