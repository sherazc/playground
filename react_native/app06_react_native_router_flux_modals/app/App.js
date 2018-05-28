import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";

import {Router, Scene, Actions} from "react-native-router-flux";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    <Scene key="home" title="Home" component={HomeScreen} initial/>
                    {/*
                    To create modal we do this trick:
                    Modal are just like normal Scene.
                    We give it animation "direction='vertical'" and
                    "hideNavBar" that will hide actionBar
                    */}
                    <Scene key="modal" title="Modal" component={ModalScreen}
                           direction="vertical"
                           hideNavBar
                    />
                </Scene>
            </Router>
        );
    }
}

// ------------- Start Screens -------------
let HomeScreen = (props) => {
    let showModal = () => {
        Actions.modal();
    };

    return (
        <View style={styles.containerHome}>
            <Text style={styles.bigTextLight}>Home Screen</Text>
            <TouchableHighlight style={styles.button} onPress={showModal}>
                <Text style={styles.buttonText}>Show Modal</Text>
            </TouchableHighlight>
        </View>
    );
};

let ModalScreen = (props) => {
    let closeModal = () => {
        /*
        We can close modal by popping it
        */
        Actions.pop();
    };

    return (
        <View style={styles.containerModal}>
            <Text style={styles.bigTextLight}>Modal Screen</Text>
            <TouchableHighlight style={styles.button} onPress={closeModal}>
                <Text style={styles.buttonText}>Close Modal</Text>
            </TouchableHighlight>
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
    containerModal: {...containerCommon, ...centerItems, backgroundColor: "#c49941"},
    bigTextDark: {...commonText, ...centerText, color: "#292929", fontSize: 50},
    bigTextLight: {...commonText, ...centerText, color: "#fdfdfd", fontSize: 50},
    buttonText: {...commonText, ...centerText, fontSize: 20, color: "#eeeeee"},
    button: {backgroundColor: "#7a9abe", padding: 15, borderWidth: 1, borderColor: "#455b78", borderRadius: 2, margin: 5},
});
// ------------- End Styles -------------
