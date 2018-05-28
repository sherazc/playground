import React from "react";
import {StackNavigator} from "react-navigation"

import Home from "./Home"
import Screen01 from "./Screen01"
import Screen02 from "./Screen02"

const App = StackNavigator({
    Home: {screen: Home},
    Screen01: {screen: Screen01},
    Screen02: {screen: Screen02}
});

export default App;