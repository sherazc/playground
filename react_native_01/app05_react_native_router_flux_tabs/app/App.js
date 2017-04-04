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
            <Router>
                <Scene key="root">
                    {/*
                    attribute "tabs" or "tabs={true}" tells react-native-router-flux that
                    this is a tab bar
                    */}
                    <Scene key="tabbar" tabs tabBarStyle={{backgroundColor: "#f9f9f9"}}>

                        {/*
                        Tab 1 = Home Tab
                        This tab only contain one scene
                        */}
                        <Scene key="homeTab" title="Home Tab" icon={TabIcon}>
                            <Scene key="home" component={HomeScreen} title="Home Screen"/>
                        </Scene>

                        {/*
                        Tab 2 = Color Tab
                        This tabl contains 2 scene
                        */}
                        <Scene key="colorTab" title="Color Tab" icon={TabIcon}>
                            <Scene key="colorScreenRed" component={RedScreen} title="Color Screen Red" initial/>
                            <Scene key="colorScreenBlue" component={BlueScreen} title="Color Screen Blue"/>
                        </Scene>

                    </Scene>
                </Scene>
            </Router>
        );
    }
}

// ------------- Start Screens -------------
let HomeScreen = (props) => {
    return (
        <View style={styles.containerHome}>
            <Text style={styles.bigTextLight}>
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
                    Actions.colorScreenBlue();
                }}>
                Red Screen
            </Text>
        </View>
    );
};

let BlueScreen = (props) => {
    return (
        <View style={styles.containerBlue}>
            <Text style={styles.bigTextLight}
                  onPress={() => {
                    Actions.colorScreenRed();
                }}>
                Blue Screen
            </Text>
        </View>
    );
};
// ------------- End Screens -------------

// ------------- Start Components -------------

/*
Tab Icon function receives an object returns a JSX object

We are using Destructuring to get "selected", "title" from it.
*/
let TabIcon = ({selected, title}) => {
    return (
        <Text style={{color: selected ? "red" : "black"}}>
            {title}
        </Text>
    );
};
// ------------- End Components -------------

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
    buttonText: {...commonText, ...centerText, fontSize: 20, color: "#eeeeee"},
    button: {
        backgroundColor: "#7a9abe",
        padding: 15,
        borderWidth: 1,
        borderColor: "#455b78",
        borderRadius: 2,
        margin: 5
    },
});
// ------------- End Styles -------------
