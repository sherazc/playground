import React from "react";
import {
    View,
    AppRegistry
} from 'react-native';

import App from "./app/App";

const Main = (props) => {
    return (
        <View style={{marginTop: 20, flex: 1}}>
          <App/>
        </View>
    );
};

AppRegistry.registerComponent('app05_react_native_router_flux_tabs', () => Main);
