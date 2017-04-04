import React from "react";
import {
    View,
    AppRegistry
} from 'react-native';

import App from "./app/App";

const Main = (props) => {
    return (
        <View>
            <App/>
        </View>
    );
};

AppRegistry.registerComponent('app01', () => Main);
