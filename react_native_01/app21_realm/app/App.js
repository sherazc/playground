import React from "react";
import {View, Text, Button} from "react-native";
import {StackNavigator} from "react-navigation";

import ListEmployee from "./screens/ListEmployee"
import AddEmployee from "./screens/AddEmployee"
import DeleteEmployee from "./screens/DeleteEmployee"
import UpdateEmployee from "./screens/UpdateEmployee"

class Operations extends React.Component {
    static SCREENS = ["ListEmployee", "AddEmployee", "DeleteEmployee", "UpdateEmployee"];

    screenButtons(allScreens, navigate) {
        return allScreens.map((screenName, index) => {
            let operationNum = index + 1;
            return <Button key={operationNum}
                           onPress={() => navigate(screenName)} title={`${operationNum}. ${screenName} >`}/>;
        });
    }

    render() {
        return(
            <View>
            <Text>All DB Operation</Text>
                {this.screenButtons(Operations.SCREENS, this.props.navigation.navigate)}
            </View>
    );}
}

const App = StackNavigator({
    Operations: {screen: Operations, navigationOptions:{title: "DB Operations"}},
    ListEmployee: {screen: ListEmployee, navigationOptions:{title: "List Employee"}},
    AddEmployee: {screen: AddEmployee, navigationOptions:{title: "Add Employee"}},
    DeleteEmployee: {screen: DeleteEmployee, navigationOptions:{title: "Delete Employee"}},
    UpdateEmployee: {screen: UpdateEmployee, navigationOptions:{title: "Update Employee"}},
});

export default App;