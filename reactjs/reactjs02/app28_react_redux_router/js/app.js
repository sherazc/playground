import React from "react";
import ReactDOM from "react-dom";
import Router from 'react-router/BrowserRouter';
import {Provider} from "react-redux";

import Employee from "./components/Employee";
import store from "./store";

let App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Employee/>
            </Router>
        </Provider>
    );
};
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);