import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableHighlight,
    Navigator,
    ScrollView
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

const SCREEN_NAMES = {
    EXAMPLE1: "Example 1",
    EXAMPLE2: "Example 2",
    EXAMPLE3: "Example 3",
    EXAMPLE4: "Example 4"
};

export default class App extends React.Component {
    render() {
        return (
            <Navigator initialRoute={{exampleName: SCREEN_NAMES.EXAMPLE1}}
            renderScene={routeRenderScreen}/>
        );
    }
}

// ------------- Start Components -------------
let Example1 = (props) => {
    return (
        <View style={styles.containerExample1}>
            <Text style={styles.bigTextLight}>{SCREEN_NAMES.EXAMPLE1}</Text>
            <NavButtons navigator={props.navigator} navigateTo={SCREEN_NAMES.EXAMPLE2}/>
            <ScrollView>
                <IconEntypo name="500px" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>Entypo</Text>
                <IconEvilIcons name="archive" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>Evil</Text>
                <IconFontAwesome name="glass" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>FontAwesome</Text>
                <IconFoundation name="address-book" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>Foundation</Text>
                <IconIonicons name="ios-add" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>Ionicons</Text>
                <IconMaterialCommunityIcons name="access-point" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>MaterialCommunityIcons</Text>
                <IconMaterialIcons name="3d-rotation" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>MaterialIcons</Text>
                <IconOcticons name="alert" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>Octicons</Text>
                <IconSimpleLineIcons name="user" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>SimpleLineIcons</Text>
                <IconZocial name="acrobat" style={styles.bigTextLight}/>
                <Text style={styles.textLight}>Zocial</Text>
            </ScrollView>
        </View>
    );
};

let Example2 = (props) => {
    return (
        <View style={styles.containerExample2}>
            <Text style={styles.bigTextLight}>{SCREEN_NAMES.EXAMPLE2}</Text>
            <NavButtons navigator={props.navigator} navigateTo={SCREEN_NAMES.EXAMPLE1}/>

            <ScrollView>
                <View style={{...centerItems}}>
                    <IconMaterialCommunityIcons name="message-reply" style={{...centerText, color: "#ffffff", fontSize: 100}}>
                        <IconEntypo name="emoji-flirt" style={{...centerText, color: "#f2ac70", fontSize: 50}}/>
                    </IconMaterialCommunityIcons>
                </View>
            </ScrollView>

        </View>
    );
};

let Example3 = (props) => {
    return (
        <View style={styles.containerExample3}>
            <Text style={styles.bigTextLight}>{SCREEN_NAMES.EXAMPLE3}</Text>
            <NavButtons navigator={props.navigator} navigateTo={SCREEN_NAMES.EXAMPLE4}/>
        </View>
    );
};

let Example4 = (props) => {
    return (
        <View style={styles.containerExample4}>
            <Text style={styles.bigTextLight}>{SCREEN_NAMES.EXAMPLE4}</Text>
            <NavButtons navigator={props.navigator} navigateTo={SCREEN_NAMES.EXAMPLE1}/>
        </View>
    );
};

let NavButtons = (props) => {
    return (
        <View>
            <TouchableHighlight style={styles.button}
                                onPress={() => props.navigator.push({exampleName: props.navigateTo})}>
                <Text style={styles.buttonText}>{props.navigateTo}</Text>
            </TouchableHighlight>
            <TouchableHighlight style={styles.button}
                                onPress={() => props.navigator.pop()}>
                <Text style={styles.buttonText}>{"< Back"}</Text>
            </TouchableHighlight>
        </View>
    );
};
// ------------- End Components -------------


// ------------- Start Route -------------
const routeRenderScreen = (route, navigator) => {
    switch (route.exampleName) {
        case SCREEN_NAMES.EXAMPLE1:
            return <Example1 navigator={navigator}/>;
            break;
        case SCREEN_NAMES.EXAMPLE2:
            return <Example2 navigator={navigator}/>;
            break;
        case SCREEN_NAMES.EXAMPLE3:
            return <Example3 navigator={navigator}/>;
            break;
        case SCREEN_NAMES.EXAMPLE4:
            return <Example4 navigator={navigator}/>;
            break;
    }
};
// ------------- End Route -------------


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
    containerExample1: {...containerCommon, backgroundColor: "#33755e"},
    containerExample2: {...containerCommon, backgroundColor: "#752426"},
    containerExample3: {...containerCommon, backgroundColor: "#682e75"},
    containerExample4: {...containerCommon, backgroundColor: "#313375"},
    bigTextDark: {...commonText, ...centerText, color: "#292929", fontSize: 50},
    bigTextLight: {...commonText, ...centerText, color: "#fdfdfd", fontSize: 50},
    textLight: {...commonText, ...centerText, color: "#fdfdfd", fontSize: 25},
    buttonText: {...commonText, ...centerText, fontSize: 20, color: "#eeeeee"},
    button: {backgroundColor: "#7a9abe", padding: 15, borderWidth: 1, borderColor: "#455b78", borderRadius: 2, margin: 5},
});
// ------------- End Styles -------------
