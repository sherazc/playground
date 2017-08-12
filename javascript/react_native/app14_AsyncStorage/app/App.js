import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet,
    Navigator,
    Image,
    ScrollView,
    TextInput,
    ListView,
    AsyncStorage
} from "react-native";

export default class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showAllItems: false,
            inputKey: "",
            inputValue: "",
            addedKeyStatus: "",
            data: [],
            dataLoaded: false
        };
    }

    editItem(rowData) {
        this.setState({inputKey: rowData.key, inputValue: rowData.value});
    }

    renderRow(rowData) {
        return (
            <View style={{flexDirection: "row", borderBottomWidth: 2, borderBottomColor: "#b5b5b5",
                backgroundColor: "#ecd26e", padding: 10}}>

                <TouchableHighlight style={styles.button} onPress={() => {this.editItem(rowData)}}>
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>Remove</Text>
                </TouchableHighlight>
                <Text style={{...styles.textDark, fontSize: 20}}>
                    {rowData.key} = {rowData.value}
                </Text>
            </View>
        );
    }

    rowHasChanged(rowA, rowB) {
        return rowA.inputKey !== rowB.inputKey;
    }


    printAsyncStorage(showStore) {
        console.log("############## running printAsyncStorage");
        if (!showStore) {
            return;
        }

        const listViewDataSource = new ListView.DataSource({rowHasChanged: this.rowHasChanged});
        let data = [];

        if (!this.state.dataLoaded) {
            AsyncStorage.getAllKeys((err, keys) => {
                AsyncStorage.multiGet(keys, (err, stores) => {
                    stores.map((result, i, store) => {
                        console.log("############## store", store);
                        // get at each store's key/value so you can work with it
                        let key = store[i][0];
                        let value = store[i][1];
                        data.push({key: key, value: value});
                    });
                    this.setState({dataLoaded: true, data});
                });

            });
        }


        const dataSource = listViewDataSource.cloneWithRows(this.state.data);
        let result = null;
        if (this.state.dataLoaded) {
            //console.log("############## data.length ", data.length);
            // if (data.length > 0) {
                result = <ListView dataSource={dataSource} renderRow={this.renderRow}/>;
            //} else {
            //    result = <Text style={{...textDark, padding: 10}}>No data found</Text>;
            //}
        } else {
            result = <Text style={{...textDark, padding: 10}}>Loading...</Text>;
        }
        return result;
    }

    printStatus(addedKeyStatus) {
        let result = null;
        switch (addedKeyStatus) {
            case "success":
                result = <View style={{padding: 10}}><Text style={textDark}>Added Successfully</Text></View>;
                break;
            case "failed":
                result = <View style={{padding: 10}}><Text style={textDark}>Unable to add</Text></View>;
                break;
            case "invalid":
                result = <View style={{padding: 10}}><Text style={textDark}>Invalid Key and Value</Text></View>;
                break;
            case "removed_all":
                result = <View style={{padding: 10}}><Text style={textDark}>Removed All</Text></View>;
                break;
            case "removed_all_fail":
                result = <View style={{padding: 10}}><Text style={textDark}>Removed All failed</Text></View>;
                break;
        }
        return result;

    }

    addItem() {
        try {
            if (this.state.inputKey.length > 0 && this.state.inputValue.length > 0) {
                // await
                AsyncStorage.setItem(this.state.inputKey, this.state.inputValue);
                this.setState({showAllItems: false, addedKeyStatus: "success", dataLoaded: false});
            } else {
                this.setState({showAllItems: false, addedKeyStatus: "invalid", dataLoaded: false});
            }
        } catch (error) {
            this.setState({showAllItems: false, addedKeyStatus: "failed", dataLoaded: false});
        }
    }

    getAllItems() {
        this.setState({showAllItems: true, addedKeyStatus: ""});
    }

    removeAllItems() {
        AsyncStorage.clear().then(() => {
            this.setState({showAllItems: false, addedKeyStatus: "removed_all", dataLoaded: false});
        }, () => {
            this.setState({showAllItems: false, addedKeyStatus: "removed_all_fail", dataLoaded: false});
        });

    }

    inputKeyChange(text) {
        this.setState({inputKey: text})
    }

    inputValueChange(text) {
        this.setState({inputValue: text})
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={{backgroundColor: "#7f5d33", height: 50}}>
                    <Text style={{...bigText, lineHeight: 50}}>
                        AsyncStorage
                    </Text>
                </View>
                <View style={styles.inputGroup}>
	                <Text style={styles.inputLabel}>Key</Text>
                    <TextInput value={this.state.inputKey} onChangeText={this.inputKeyChange.bind(this)}
                        style={styles.input} placeholder="Enter Key"/>
                </View>
                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Value</Text>
                    <TextInput value={this.state.inputValue} onChangeText={this.inputValueChange.bind(this)}
                        style={styles.input} placeholder="Enter Value"/>
                </View>
                <View style={styles.inputGroup}>
                    <TouchableHighlight style={styles.button} onPress={this.addItem.bind(this)}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this.getAllItems.bind(this)}>
                        <Text style={styles.buttonText}>Get All</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this.removeAllItems.bind(this)}>
                        <Text style={styles.buttonText}>Remove All</Text>
                    </TouchableHighlight>
                </View>
                {this.printStatus(this.state.addedKeyStatus)}
                {this.printAsyncStorage(this.state.showAllItems)}
            </ScrollView>
        );
    }
}

// ------------- Start components -------------

// ------------- End components -------------

// ------------- Start Styles -------------
let containerCommon = {flex: 1};
let centerItems = {alignItems: "center", justifyContent: "center"};
let centerText = {textAlign: "center"};
let bigText = {...centerText, color: "#fafafa", fontSize: 30};
let bigTextDark = {...centerText, color: "#363636", fontSize: 30};
let textLight = {color: "#fafafa", fontSize: 20};
let textDark = {color: "#1c1c1c", fontSize: 20};

let styles = StyleSheet.create({
    container: {...containerCommon, backgroundColor: "#e8e0ad"},
    buttonText: {...centerText, fontSize: 20, color:"#eeeeee"},
    button: {backgroundColor: "#977237",
        padding: 10, borderWidth: 1, borderColor: "#65482d", borderRadius: 2, margin:5},

    inputGroup: {flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#d1c7ba", padding: 5},
    inputLabel: {...textDark, lineHeight: 45, width: 75},
    input: {flex: 1, ...textDark},

});
// ------------- End Styles -------------
