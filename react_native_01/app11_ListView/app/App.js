import React from "react";
import {
    View,
    Text,
    StyleSheet,
    ListView
} from "react-native";


let data = [
    {id: 1, name: "name01", empLocation: "location01"},
    {id: 2, name: "name02", empLocation: "location02"},
    {id: 3, name: "name03", empLocation: "location03"},
    {id: 4, name: "name04", empLocation: "location04"},
    {id: 5, name: "name05", empLocation: "location05"},
    {id: 6, name: "name06", empLocation: "location06"}
];


let rowHasChanged = (rowA, rowB) => {
    return rowA.id !== rowB.id;
};

let renderRow = (rowData) => {
    return (
        <View style={{borderBottomWidth: 2, borderBottomColor: "#b5b5b5"}}>
            <Text style={{fontSize: 30, color: "#262626", padding: 10}}>{rowData.name}</Text>
            <Text style={{fontSize: 20, color: "#262626", padding: 10}}>{rowData.empLocation}</Text>
        </View>
    );
};

export default class App extends React.Component {
    constructor(props) {
        super(props);
        const dataSource = new ListView.DataSource({rowHasChanged: rowHasChanged});

        this.state = {dataSource: dataSource.cloneWithRows(data)};
    }

    render() {
        return (
            <View style={styles.containerHome}>
                <Text style={styles.bigTextLight}>List View</Text>
                <ListView
                    style={{
                        backgroundColor: "#dee0de"

                    }}
                    dataSource={this.state.dataSource} renderRow={renderRow}/>

            </View>
        );
    }
}

// ------------- Start Components -------------
// ------------- End Components -------------


// ------------- Start Styles -------------
let containerCommon = {
    flex: 1
};
let commonText = {};
let centerItems = {justifyContent: "center"};
let centerText = {textAlign: "center"};
let styles = StyleSheet.create({
    containerHome: {...containerCommon, ...centerItems, backgroundColor: "#4c6238"},
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