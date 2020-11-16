
import React from 'react';
import { Provider } from "react-redux";
import { StatusBar } from 'react-native';
import { NavRoutes } from './src/components/NavRoutes';
import store from "./src/store/rootReducer";
import { ConstantsStyles } from './src/services/Constants';

const App: () => React.ReactElement = () => {
    return (
        <Provider store={store}>
            <StatusBar barStyle="light-content" backgroundColor={ConstantsStyles.color.background2} />
            <NavRoutes />
        </Provider>
    );
};

export default App;
