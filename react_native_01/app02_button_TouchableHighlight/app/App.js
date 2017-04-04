import React from "react";
import {
    View,
    Text,
    TouchableHighlight,
    StyleSheet
} from "react-native";

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: 0
        };
    }

    add() {
        this.setState({result: this.state.result + 1});
    }

    subtract() {
        this.setState({result: this.state.result - 1});
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={this.add.bind(this)}
                    style={styles.buttonGreen}>
                    <View>
                        <Text style={styles.textButton}>Add</Text>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight onPress={this.subtract.bind(this)}
                    style={styles.buttonRed}>
                    <View>
                        <Text style={styles.textButton}>Subtract</Text>
                    </View>
                </TouchableHighlight>
                <View style={styles.result}>
                    <Text style={styles.textResult}>
                        Result: {this.state.result}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonRed: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ec8683',
        padding: 10,
        alignSelf: 'stretch',

    },
    buttonGreen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#81d54f',
        padding: 10,
        alignSelf: 'stretch',
    },
    result: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f1db',
        padding: 10,
        alignSelf: 'stretch',
    },
    textButton: {
        color: "#f6f6f6",
        fontSize: 24
    },
    textResult: {
        color: "#3e3e3e",
        fontSize: 24
    }
});