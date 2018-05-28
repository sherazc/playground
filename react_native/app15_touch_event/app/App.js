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


export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nativeEventText: "",
            doodleX: 100, doodleY: 200
        }
    }

    myOnResponderGrant({nativeEvent}) {
        this.setState(
            {
                nativeEventText: this.nativeEventToText(nativeEvent),
                doodleX: nativeEvent.pageX,
                doodleY: nativeEvent.pageY
            }
        );
        console.log({nativeEvent});
        return true;
    }


    nativeEventToText(nativeEvent) {
        let result = "";
        result += "identifier=" + nativeEvent.identifier;
        result += " locationX=" + nativeEvent.locationX;
        result += " locationY=" + nativeEvent.locationY;
        result += " pageX=" + nativeEvent.pageX;
        result += " pageY=" + nativeEvent.pageY;
        return result;
    }

    render() {
        console.log("Yaaaah");
        return (
            <View style={{flex: 1}}>
                <Text style={{height: 100}}>{this.state.nativeEventText}</Text>
                <View style={{backgroundColor: "#a7c04e", flex: 1}}

                      // Touch Down
                      onResponderGrant={this.myOnResponderGrant.bind(this)}
                      // Touch Up
                      onResponderRelease={this.myOnResponderGrant.bind(this)}

                      // Touch Drag
                      onResponderMove={this.myOnResponderGrant.bind(this)}

                      // Respond to Drag Event
                      onMoveShouldSetResponder={(event) => {return true;}}

                      // Respond to Touch Event
                      onStartShouldSetResponderCapture={(event) => {return true;}}>
                    <Image source={require("./images/panda.png")}
                        style={{height: 100, width: 100, position: "relative",
                    left: this.state.doodleX - 50, top: this.state.doodleY - 150}}></Image>
                </View>
            </View>
        );
    }
}

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
