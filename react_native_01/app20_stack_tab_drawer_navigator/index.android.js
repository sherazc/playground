import React from 'react';
import {AppRegistry, View} from 'react-native';
import App from "./app/App";

export default class Index extends React.Component {
    render() {
        return(
            <View style={{flex: 1}}>
              <App/>
            </View>
        );
    }
}

AppRegistry.registerComponent('app20_stack_tab_drawer_navigator', () => App);
