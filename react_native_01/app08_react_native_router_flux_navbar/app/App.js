import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";

import {Router, Scene, Actions, NavBar} from "react-native-router-flux";

export default class App extends React.Component {
    render() {
        return (
            <Router>
                <Scene key="root">
                    {/*
                    We can either specify navBar={} property. or can return View from
                    static renderNavigationBar(props) {} function or Screen component.
                    */}
                    <Scene key="home" title="Home" component={HomeScreen} initial navBar={HomeScreenNavBar}/>
                    <Scene key="orange" title="Orange" component={OrangeScreen}/>
                </Scene>
            </Router>
        );
    }
}

// ------------- Start Components -------------
let HomeScreen = (props) => {
    return (
        <View style={styles.containerHome}>
            <Text style={styles.bigTextLight}>Home</Text>
            <TouchableHighlight style={styles.button} onPress={() => {Actions.orange();}}>
                <Text style={styles.buttonText}>Orange</Text>
            </TouchableHighlight>
        </View>
    );
};

class OrangeScreen extends React.Component {
    /*
    props passed to this method is loaded with all sorts of
    information about navigation.
    */
    static renderNavigationBar(navProps) {
        return (<OrangeScreenNavBar navProps={navProps}/>);
    }

    render() {
        return (
            <View style={styles.containerOrange}>
                <Text style={styles.bigTextLight}>Orange</Text>
                <TouchableHighlight style={styles.button} onPress={() => {Actions.home();}}>
                    <Text style={styles.buttonText}>Home</Text>
                </TouchableHighlight>
            </View>
        );
    }
}
// ------------- End Components -------------

// ------------- Start Nav Bars -------------
/*
To target each section individually we can extend NavBar
and implement renderLeftButton(), renderRightButton (), and renderTitle()

In this example below we need to style each section of nav bar.
*/
class HomeScreenNavBar extends NavBar {

    renderLeftButton() {
        return <View key="1"><Text>Left</Text></View>;
    }

    renderRightButton () {
        return <View key="2"><Text>Right</Text></View>;
    }


    // Making title keeps giving me duplicate key warning
    renderTitle() {
        return <View key="3"><Text>{this.props.title}</Text></View>;
    }
}

/*
To create entire nav bar we can create a regular custom React component
and return it from static renderNavigationBar(props) {} function.
*/
let OrangeScreenNavBar = (props) => {
    return (
        <View style={
                {
                    ...centerItems,
                    height: 60, backgroundColor: "#e72f2f", position: "absolute",
                    paddingTop: 0, top: 0, right: 0, left: 0, borderBottomWidth: 0.5,
                 }
            }>
            <Text style={{fontSize: 20, color: "#eee"}}>{props.navProps.title}</Text>
        </View>
    );
};
// ------------- End Nav Bars -------------

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
    containerOrange: {...containerCommon, ...centerItems, backgroundColor: "#eeb31a"},
    bigTextDark: {...commonText, ...centerText, color: "#292929", fontSize: 50},
    bigTextLight: {...commonText, ...centerText, color: "#fdfdfd", fontSize: 50},
    buttonText: {...commonText, ...centerText, fontSize: 20, color: "#eeeeee"},
    button: {backgroundColor: "#7a9abe", padding: 15, borderWidth: 1, borderColor: "#455b78", borderRadius: 2, margin: 5},
});
// ------------- End Styles -------------
