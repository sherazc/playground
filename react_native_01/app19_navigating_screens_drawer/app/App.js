import React from "react";
import {DrawerNavigator} from "react-navigation";
import {Home, Screen1, Screen2} from "./screens"

const App = DrawerNavigator({
    Home: {screen: Home},
    Screen1: {screen: Screen1},
    Screen2: {screen: Screen2},
});

export default App;