import React, {Component} from 'react';
import {
    AppRegistry,
    View
} from 'react-native';

import App from "./app/App"

export default class Index extends Component {
    render() {
        return (
            <View style={{flex: 1, marginTop: 20}}>
                <App/>
            </View>
        );
    }
}

AppRegistry.registerComponent('app19_navigating_screens_drawer', () => Index);
