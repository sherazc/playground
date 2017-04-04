import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Navigator,
    Image,
    ScrollView,
    Platform
} from "react-native";

import IconEntypo from 'react-native-vector-icons/Entypo';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconFoundation from 'react-native-vector-icons/Foundation';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconMaterialIcons from 'react-native-vector-icons/MaterialIcons';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconZocial from 'react-native-vector-icons/Zocial';

import Drawer from "react-native-drawer";

const SCREEN_NAMES = {
    HOME: "Home",
    ONE: "One",
    TWO: "Two",
    THREE: "Three",
    SETTINGS: "Settings",

};

function isIos() {
    return Platform.OS === "ios";
}

// ------------- Start App -------------

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    openDrawer() {
        this.refs.drawer.open();
    }

    closeDrawer() {
        this.refs.drawer.close();
    }

    getNavigator() {
        return this.refs.navigator;
    }

    render() {
        return (
            <Drawer
                content={<ScreenDrawer closeDrawer={this.closeDrawer.bind(this)} navigator={this.getNavigator.bind(this)}/>}
                ref="drawer"
                type="overlay"
                tapToClose={true}
                openDrawerOffset={0.2} // 20% gap on the right side of drawer
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                tweenHandler={(ratio) => ({
                    main: { opacity:(2-ratio)/2 }
                })}>
                <Navigator ref="navigator"
                    renderScene={screenRouter}
                    initialRoute={{screenName: SCREEN_NAMES.HOME}}
                    navigationBar={navigationBar(this.openDrawer.bind(this))} />
            </Drawer>
        );
    }
}

// ------------- End App -------------

// ------------- Start Screen -------------

let ScreenDrawer = (props) => {

    return (
        <ScrollView style={styles.containerDrawer}>
            <Image
                source={require("./images/red_background.png")}
                style={{ resizeMode: Image.resizeMode.cover, height: 200}}>
                <View style={{backgroundColor: "transparent", flex: 1, justifyContent: "flex-end"}}>
                    <View style={{marginBottom: 10, marginLeft: 10}}>
                        <Image source={require("./images/red_man_256.png")} style={{height: 100, width: 100}}/>
                        <Text style={styles.textLight}>
                            Drawer
                        </Text>
                    </View>

                </View>
            </Image>
            <View style={{flex: 1}}>
                <DrawerHeading text="Main Items"/>
                <DrawerItem navigator={props.navigator} closeDrawer={props.closeDrawer} selected={true} collectionName="FontAwesome" iconName="home" textMiddle="Home" textRight=""/>
                <DrawerItem navigator={props.navigator} closeDrawer={props.closeDrawer} collectionName="Entypo" iconName="heart" textMiddle="One" textRight="5"/>

                {/*
                <DrawerSeparator/>
                <DrawerHeading text="Other Items"/>
                <DrawerItem closeDrawer={props.closeDrawer} collectionName="Entypo" iconName="game-controller" textMiddle="Two"/>
                <DrawerItem closeDrawer={props.closeDrawer} collectionName="FontAwesome" iconName="download" textMiddle="Three" textRight="@"/>
                <DrawerSeparator/>
                <DrawerItem closeDrawer={props.closeDrawer} collectionName="FontAwesome" iconName="cog" textMiddle="Settings" textRight=""/>
*/}
            </View>
        </ScrollView>
    );
};


let ScreenHome = (props) => {
    return (
        <View style={styles.containerHome}>
            <TouchableHighlight onPress={() => {
                    props.navigator.push({screenName: SCREEN_NAMES.TWO});
                }}>
            <Text style={styles.textDark} >
                Home Screen
            </Text>

            </TouchableHighlight>
            <Text style={styles.textDark}>
                Screen One
            </Text>

        </View>
    );
};

let ScreenOne = (props) => {
    return (
        <View style={styles.containerOne}>
            <Text style={styles.textDark}>
                Screen One
            </Text>
        </View>
    );
};

let ScreenTwo = (props) => {
    return (
        <View style={styles.containerOne}>
            <Text style={styles.textDark}>
                Screen Two
            </Text>
        </View>
    );
};

let ScreenThree = (props) => {
    return (
        <View style={styles.containerOne}>
            <Text style={styles.textDark}>
                Screen Three
            </Text>
        </View>
    );
};

let ScreenSettings = (props) => {
    return (
        <View style={styles.containerOne}>
            <Text style={styles.textDark}>
                Screen Settings
            </Text>
        </View>
    );
};
// ------------- End Screen -------------

// ------------- Start Router -------------

let screenRouter = (route, navigator) => {
    switch (route.screenName) {
        case SCREEN_NAMES.HOME:
            return <ScreenHome navigator={navigator}/>;
            break;
        case SCREEN_NAMES.ONE:
            return <ScreenOne/>;
            break;
        case SCREEN_NAMES.TWO:
            return <ScreenTwo/>;
            break;
            case SCREEN_NAMES.THREE:
            return <ScreenThree/>;
            break;
        case SCREEN_NAMES.SETTINGS:
            return <ScreenSetting/>;
            break;

    }
};

// ------------- End Router -------------

// ------------- Start Navigation Bar -------------
let leftButton = (openDrawer, navigator, index) => {
    if (index == 0) {
        return (
            <View style={styles.navButton}>
                <TouchableHighlight style={styles.navButton} onPress={openDrawer}>
                    <IconFontAwesome name="bars" style={styles.navButtonText}/>
                </TouchableHighlight>
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

let rightButton = () => {
    /*
    if (route.screenName == SCREEN_NAMES.) {
        return null;
    } else {
      */
        return (
            <TouchableHighlight style={styles.navButton} onPress={()=> {
                navigator.push({screenName: VIEW_NAMES.SETTINGS})
            }}>
                <IconFontAwesome name="sliders" style={styles.navButtonText}/>
            </TouchableHighlight>
        );
    // }
};

let title = (route) => {
    return (
        <View style={styles.navTitle}>
            <Text style={styles.navTitleText}>
                {route.screenTitle}
            </Text>
        </View>
    );
};

let navigationBar = (openDrawer) => {
    return (
        <Navigator.NavigationBar
            routeMapper={{
                LeftButton: (route, navigator, index, navState) => {
                    return leftButton(openDrawer, navigator, index);
                },
                RightButton: (route, navigator, index, navState) => {
                    return rightButton();
                },
                Title: (route, navigator, index, navState) => {
                    return title(route);
                }
            }}
            style={{backgroundColor: '#df4f1e'}}
        />
    );
};

// ------------- End Navigation Bar -------------

// ------------- Start Components -------------

let DrawerItem = (props) => {
    let drawerItemButton = {padding: 15, backgroundColor: "#f0f0f0"};
    let drawerItemIcon = {color: "#4a4a4a", fontSize: 25, width: 30, marginRight: 10};
    let drawerItemTextMiddle = {flex: 1, color: "#4a4a4a", fontSize: 20};
    let drawerItemTextRight = {color: "#4a4a4a", fontSize: 20, width: 30};

    if(props.selected) {
        drawerItemButton.backgroundColor = "#e2e2e2";
        drawerItemIcon.color = drawerItemTextMiddle.color = drawerItemTextRight.color = "#000";
    }

    let icon = null;
    if (props.collectionName == "FontAwesome") {
        icon = <IconFontAwesome name={props.iconName} style={drawerItemIcon}/>;
    } else if (props.collectionName == "Entypo") {
        icon = <IconEntypo name={props.iconName} style={drawerItemIcon}/>;
    }

    function navigate() {
        if (!props.selected) {

        }
        props.navigator().push({screenName: SCREEN_NAMES.THREE});
        props.closeDrawer();
    }

    return (
        <TouchableHighlight style={drawerItemButton} onPress={navigate}>
            <View style={{flex: 1, flexDirection: "row"}}>
                {icon}
                <Text style={drawerItemTextMiddle}>{props.textMiddle}</Text>
                <Text style={drawerItemTextRight}>{props.textRight}</Text>
            </View>

        </TouchableHighlight>
    );
};

let DrawerHeading = (props) => {
    return (
        <View style={{padding: 10, backgroundColor: "#f0f0f0"}}>
            <Text style={{flex: 1, color: "#4a4a4a", fontSize: 20, fontWeight: "bold"}}>{props.text}</Text>
        </View>
    );
};

let DrawerSeparator = (props) => {
    return (
        <View style={{backgroundColor: "#cfcfcf", height: 1}}>

        </View>
    );
};
// ------------- End Components -------------

// ------------- Start Styles -------------
let containerCommon = {flex: 1, marginTop: isIos() ? 65 : 55};
let commonText = {};
let centerItems = {alignItems: "center", justifyContent: "center"};
let centerText = {textAlign: "center"};
let styles = StyleSheet.create({
    containerDrawer: {flex: 1, backgroundColor: "#f3f3f3"},
    containerHome: {...containerCommon, backgroundColor: "#eae4d7"},
    containerOne: {...containerCommon, backgroundColor: "#e2eae0"},
    textDark: {...commonText, color: "#292929", fontSize: 20},
    textLight: {...commonText, color: "#fdfdfd", fontSize: 20, },
    navButton: {...centerItems, width: 50, backgroundColor: "transparent", padding: 10},
    navButtonText: {...centerText,color: "#f9f9f9", fontSize: 25, backgroundColor: "transparent"},
    navTitle: {...centerItems,  backgroundColor: "transparent", padding: 10},
    navTitleText: {...centerText,color: "#f9f9f9", fontSize: 25},
});
// ------------- End Styles -------------
