import React from "react";
import {
    View,
    AppRegistry
} from 'react-native';

import App from "./app/App";

const Main = (props) => {
    return (
        <View style={{flex: 1, marginTop: 20}}>
          <App/>
        </View>
    );
};

AppRegistry.registerComponent('app12_networking', () => Main);
