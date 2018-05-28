import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Navigator,
    Image,
    ScrollView
} from "react-native";

const SCREEN_NAMES = {
    BACK: "< Back",
    ONE: "ONE",
    TWO: "Two",
    THREE: "Three",

};

export default class App extends React.Component {
    render() {
        return (
            <Navigator
                initialRoute={{screenName: SCREEN_NAMES.ONE}}
                renderScene={navigatorRenderScene}
            />
        );
    }
}

// ------------- Start Navigator Render Scene -------------
let navigatorRenderScene = (route, navigator) => {
    switch(route.screenName) {
        case (SCREEN_NAMES.ONE):
            return <ImageSimple navigator={navigator} />;
            break;
        case (SCREEN_NAMES.TWO):
            return <ImagePlatform navigator={navigator}/>;
            break;

        case (SCREEN_NAMES.THREE):
            return <ImageScreenDensity navigator={navigator}/>
            break;
    }
};
// ------------- End Navigator Render Scene -------------

// ------------- Start Screens -------------
let ImageSimple = (props) => {
    return (
        <ScrollView style={styles.containerImage}>
            <TopNavigation navigator={props.navigator}/>
            <Text style={styles.bigText}>Simple Image</Text>
            <Text style={styles.text}>Local Image =</Text>
            <Text style={styles.text}>./images/study_icon_32.png</Text>
            <Image source={require("./images/study_icon_32.png")}
                style={{width: 200, height: 200}}/>

            <Text style={styles.text}>Web Image =</Text>
            <Text style={styles.text}>https://facebook.github.io/react/img/logo_og.png</Text>
            <Image source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                   style={{width: 200, height: 200}}/>
        </ScrollView>
    );
};

let ImagePlatform = (props) => {
    return (
        <ScrollView style={styles.containerImage}>
            <TopNavigation navigator={props.navigator}/>
            <Text style={styles.bigText}>Platform Images</Text>
            <Text style={styles.text}>
                Physically 2 images are available:
                platform.ios.png, and platform.android.png.
            </Text>
            <Text style={styles.text}>--------------</Text>
            <Text style={styles.text}>
                {`We have used the tag <Image source={require("./images/platform.png")}/>`}
            </Text>
            <Text style={styles.text}>--------------</Text>
            <Text style={styles.text}>
                React Native automatically figures out platform and include respected image
                platform.ios.png, and platform.android.png
            </Text>
            <Image source={require("./images/platform.png")}
                   style={{width: 100, height: 100}}/>
        </ScrollView>
    );
};


let ImageScreenDensity = (props) => {
    return (
        <ScrollView style={styles.containerImage}>
            <TopNavigation navigator={props.navigator}/>
            <Text style={styles.bigText}>Screen Density Images</Text>
            <Text style={styles.text}>
                Store images ending with densitity #x and .platform_name. and image extention
            </Text>
            <Text style={styles.text}>--------------</Text>
            <Text style={styles.text}>
                Do not specify density or platform name in the image source
            </Text>
            <Text style={styles.text}>--------------</Text>
            <Image source={require("./images/platform_density.png")}
                   style={{width: 100, height: 100}}/>
        </ScrollView>
    );
};
// ------------- End Screens -------------

// ------------- Start components -------------
let TopNavigation = (props) => {
    return(
        <View style={styles.topNavigation}>
            <GotoButton navigator={props.navigator} screenName={SCREEN_NAMES.BACK} label="<"/>
            <GotoButton navigator={props.navigator} screenName={SCREEN_NAMES.ONE} label="1"/>
            <GotoButton navigator={props.navigator} screenName={SCREEN_NAMES.TWO} label="2"/>
            <GotoButton navigator={props.navigator} screenName={SCREEN_NAMES.THREE} label="3"/>
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
            <Text style={styles.buttonText}>{props.label}</Text>
        </TouchableHighlight>

    );
};
// ------------- End components -------------

// ------------- Start Styles -------------
let containerCommon = {flex: 1};
let commonText = {};
let centerItems = {alignItems: "center", justifyContent: "center"};
let centerText = {textAlign: "center"};
let styles = StyleSheet.create({
    containerImage: {...containerCommon, backgroundColor: "#2a5f75"},
    containerOne: {...containerCommon, backgroundColor: "#3d753f"},
    containerTwo: {...containerCommon, backgroundColor: "#752e49"},
    bigText: {...commonText, ...centerText, color: "#fafafa", fontSize: 50},
    text: {...commonText, ...centerText, color: "#fafafa", fontSize: 20},
    buttonText: {...commonText, ...centerText, fontSize: 20, color:"#eeeeee"},
    button: {backgroundColor: "#7a9abe", padding: 15, borderWidth: 1, borderColor: "#455b78", borderRadius: 2, margin:5},
    topNavigation: {...centerItems, flexDirection: "row", backgroundColor: "#f58033", padding: 10}
});
// ------------- End Styles -------------
