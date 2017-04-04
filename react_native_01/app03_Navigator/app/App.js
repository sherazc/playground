import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Navigator
} from "react-native";

const SCREEN_NAMES = {
    HOME: "Home",
    ONE: "One",
    TWO: "Two",
    BACK: "< Back"
};

export default class App extends React.Component {
    render() {
        return (
            <Navigator
                initialRoute={{screenName: SCREEN_NAMES.HOME}}
                renderScene={navigatorRenderScene}
            />
        );
    }
}

// ------------- Start Navigator Render Scene -------------
let navigatorRenderScene = (route, navagator) => {
    switch(route.screenName) {
        case (SCREEN_NAMES.HOME):
            return (<SimpleComponent
                navigator={navagator}
                containerStyle={styles.containerHome}
                title={route.screenName}
                nextScreen={SCREEN_NAMES.ONE}/>);
            break;
        case (SCREEN_NAMES.ONE):
            return (<SimpleComponent
                navigator={navagator}
                containerStyle={styles.containerOne}
                title={route.screenName}
                nextScreen={SCREEN_NAMES.TWO}/>);
            break;
        case (SCREEN_NAMES.TWO):
            return (<SimpleComponent
                navigator={navagator}
                containerStyle={styles.containerTwo}
                title={route.screenName}
                nextScreen={SCREEN_NAMES.HOME}/>);
            break;
    }
};
// ------------- End Navigator Render Scene -------------

// ------------- Start Screens -------------
let SimpleComponent = (props) => {
    return (
        <View style={props.containerStyle}>
            <TopNavigation navigator={props.navigator}/>
            <Text style={styles.bigText}>{props.title}</Text>
            <GotoButton navigator={props.navigator} screenName={props.nextScreen}/>
            <GotoButton navigator={props.navigator} screenName={SCREEN_NAMES.BACK}/>
        </View>
    );
};
// ------------- End Screens -------------

// ------------- Start components -------------
let TopNavigation = (props) => {
    return(
        <View style={styles.topNavigation}>
            <GotoButton navigator={props.navigator} screenName={SCREEN_NAMES.BACK}/>
            <GotoButton navigator={props.navigator} screenName={SCREEN_NAMES.HOME}/>
            <GotoButton navigator={props.navigator} screenName={SCREEN_NAMES.ONE}/>
            <GotoButton navigator={props.navigator} screenName={SCREEN_NAMES.TWO}/>
        </View>
    );
};

let GotoButton = (props) => {
    let pushScreen = () => {
        if (props.screenName == SCREEN_NAMES.BACK) {
            props.navigator.pop();
        } else {
            props.navigator.push({screenName: props.screenName});
        }
    };

    return (
        <TouchableHighlight style={styles.button} onPress={pushScreen}>
            <Text style={styles.buttonText}>{props.screenName}</Text>
        </TouchableHighlight>

    );
};
// ------------- End components -------------


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
    containerHome: {...containerCommon, backgroundColor: "#2a5f75"},
    containerOne: {...containerCommon, backgroundColor: "#3d753f"},
    containerTwo: {...containerCommon, backgroundColor: "#752e49"},
    bigText: {...commonText, ...centerText, color: "#fafafa", fontSize: 50},
    buttonText: {...commonText, ...centerText, fontSize: 20, color:"#eeeeee"},
    button: {backgroundColor: "#7a9abe", padding: 15, borderWidth: 1, borderColor: "#455b78", borderRadius: 2, margin:5},
    topNavigation: {...centerItems, flexDirection: "row", backgroundColor: "#f53684", padding: 10}
});
// ------------- End Styles -------------
