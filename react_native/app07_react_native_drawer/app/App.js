import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight
} from "react-native";

import Drawer from "react-native-drawer";

/*

These Drawer settings will cover the view

type="overlay"
tapToClose={true}
openDrawerOffset={0.2} // 20% gap on the right side of drawer
panCloseMask={0.2}
closedDrawerOffset={-3}
tweenHandler={(ratio) => ({
    main: { opacity:(2-ratio)/2 }
})}


These Drawer settings will push the view

tapToClose={true}
type="static"
openDrawerOffset={100}
tweenHandler={Drawer.tweenPresets.parallax}
*/
export default class App extends React.Component {
    openDrawer() {
        this.drawer.open();
    }

    closeDrawer() {
        this.drawer.close();
    }

    render() {
        return (
            <Drawer
                content={<DrawerScreen closeDrawer={this.closeDrawer.bind(this)}/>}
                ref={(drawer) => {
                    this.drawer = drawer;
                }}
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}>
                <HomeScreen openDrawer={this.openDrawer.bind(this)}/>
            </Drawer>
        );
    }
}

// ------------- Start Screens -------------
let HomeScreen = (props) => {
    return (
        <View style={styles.containerHome}>
            <Text style={styles.bigTextLight}>Home Screen</Text>
            <TouchableHighlight style={styles.button} onPress={props.openDrawer}>
                <Text style={styles.buttonText}>Show Drawer</Text>
            </TouchableHighlight>
        </View>
    );
};

let DrawerScreen = (props) => {
    return (
        <View style={styles.containerModal}>
            <Text style={styles.bigTextLight}>Drawer</Text>
            <TouchableHighlight style={styles.button} onPress={props.closeDrawer}>
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
