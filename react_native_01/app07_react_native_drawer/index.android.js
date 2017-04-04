import React from "react";
import {
    View,
    AppRegistry
} from 'react-native';

import App from "./app/App";

const Main = (props) => {
    return (
        <View style={{flex: 1}}>
          <App/>
        </View>
    );
};

AppRegistry.registerComponent('app07_react_native_drawer', () => Main);
