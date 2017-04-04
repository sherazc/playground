import React from "react";
import {
    View,Text,StyleSheet,ListView, TouchableHighlight
} from "react-native";

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

const dataSource = new ListView.DataSource({rowHasChanged: rowHasChanged});

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {dataSource: dataSource.cloneWithRows([])};
    }

    // ------------- Start Network -------------
    fetchEmployees(count) {
        /*
        localhost will not work because phone also have and IP and
        phone's localhost is different where server is not running

        http://stackoverflow.com/questions/33969333/react-native-fetch-request-failed-with-error-typeerror-network-request-faile
        */
        fetch("http://192.168.1.130:3000/emp-data?count=" + count)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({dataSource: dataSource.cloneWithRows(responseJson)});
            })
            .catch((error) => {
                console.error("Error: ", error);
            });
    }
    // ------------- End Network -------------

    render() {
        let dataListView = <View></View>;
        if (this.state.dataSource != null && this.state.dataSource.getRowCount() > 0) {
            dataListView = <ListView
                style={{backgroundColor: "#dee0de"}}
                dataSource={this.state.dataSource} renderRow={renderRow}/>;
        }

        return (
            <View style={styles.containerHome}>
                <View style={{flexDirection: "row", backgroundColor: "red"}}>
                    <TouchableHighlight style={styles.button} onPress={() => this.fetchEmployees(10)}>
                        <Text style={styles.buttonText}>10 Employee</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={() => this.fetchEmployees(100)}>
                        <Text style={styles.buttonText}>100 Employee</Text>
                    </TouchableHighlight>
                </View>
                {dataListView}
            </View>
        );
    }
}

// ------------- Start Styles -------------
let containerCommon = {
    flex: 1
};
let commonText = {};
let centerItems = {justifyContent: "center"};
let centerText = {textAlign: "center"};
let styles = StyleSheet.create({
    containerHome: {...containerCommon, backgroundColor: "#4c6238"},
    buttonText: {...commonText, ...centerText, fontSize: 20, color: "#eeeeee"},
    button: {backgroundColor: "#7a9abe",padding: 5, borderWidth: 1,
        borderColor: "#455b78", borderRadius: 2, margin: 5},
});
// ------------- End Styles -------------