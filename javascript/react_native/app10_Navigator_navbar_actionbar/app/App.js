import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Navigator
} from "react-native";

const VIEW_NAMES = {
    HOME: "Home",
    SETTINGS: "Settings"
};

export default class App extends React.Component {
    render() {
        return (
            <Navigator renderScene={viewRouter}
                       initialRoute={{viewName: VIEW_NAMES.HOME}}
                       navigationBar={navigationBar}
            />
        );
    }
}

// ------------- Start Components -------------
let Home = (props) => {
    return (
        <View style={styles.containerHome}>
            <Text style={styles.bigTextLight}>Home</Text>
        </View>
    );
};

let Settings = (props) => {
    return (
        <View style={styles.containerSettings}>
            <Text style={styles.bigTextLight}>Settings</Text>
        </View>
    );
};
// ------------- End Components -------------

// ------------- Start Router -------------
let viewRouter = (route, navigation) => {
    switch (route.viewName) {
        case VIEW_NAMES.HOME:
            return <Home/>;
            break;
        case VIEW_NAMES.SETTINGS:
            return <Settings/>;
            break;
    }
};

// ------------- End Router -------------

// ------------- Start Navigation Bar -------------
let leftButton = (route, navigator, index, navState) => {
    if (index == 0) {
        return (
            <View style={styles.navButton}>
                <Text style={styles.navButtonText}>
                    =
                </Text>
            </View>
        );
    } else {
        return (
            <TouchableHighlight style={styles.navButton} onPress={()=> navigator.pop()}>
                <Text style={styles.navButtonText}>
                    {"<"}
                </Text>
            </TouchableHighlight>
        );
    }
};

let rightButton = (route, navigator, index, navState) => {
    if (route.viewName == VIEW_NAMES.SETTINGS) {
        return null;
    } else {
        return (
            <TouchableHighlight style={styles.navButton} onPress={()=> {
                navigator.push({viewName: VIEW_NAMES.SETTINGS})
            }}>
                <Text style={styles.navButtonText}>
                    S
                </Text>
            </TouchableHighlight>
        );
    }
};

let title = (route, navigator, index, navState) => {
    return (
        <View style={styles.navTitle}>
            <Text style={styles.navTitleText}>
                {route.viewName}
            </Text>
        </View>
    );
};

let navigationBar = (
    <Navigator.NavigationBar
        routeMapper={{
            LeftButton: leftButton,
            RightButton: rightButton,
            Title: title
        }}
        style={{backgroundColor: '#df4f1e'}}
    />
);

// ------------- Start Styles -------------
let containerCommon = {
    flex: 1
};
let commonText = {};
let centerItems = {alignItems: "center", justifyContent: "center"};
let centerText = {textAlign: "center"};
let styles = StyleSheet.create({
    containerHome: {...containerCommon, ...centerItems, backgroundColor: "#2a5f75"},
    containerSettings: {...containerCommon, ...centerItems, backgroundColor: "#3d753f"},
    bigTextLight: {...commonText, ...centerText, color: "#fafafa", fontSize: 50},
    buttonText: {...commonText, ...centerText, fontSize: 20, color: "#eeeeee"},
    button: {backgroundColor: "#7a9abe",padding: 15, borderWidth: 1, borderColor: "#455b78", borderRadius: 2, margin: 5},
    topNavigation: {...centerItems, flexDirection: "row", backgroundColor: "#f53684", padding: 10},
    navButton: {...centerItems, width: 50, backgroundColor: "transparent", padding: 10},
    navButtonText: {...centerText,color: "#f9f9f9", fontSize: 25},
    navTitle: {...centerItems,  backgroundColor: "transparent", padding: 10},
    navTitleText: {...centerText,color: "#f9f9f9", fontSize: 25}
});
// ------------- End Styles -------------