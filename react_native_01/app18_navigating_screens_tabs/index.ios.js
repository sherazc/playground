import React from 'react';
import {AppRegistry, View} from 'react-native';
import App from "./app/App";

class Index extends React.Component {
    render() {
        return (
            <View style={{flex: 1, marginTop: 20}}>
                <App/>
            </View>
        );
    }
}

AppRegistry.registerComponent('app18_navigating_screens_tabs', () => Index);