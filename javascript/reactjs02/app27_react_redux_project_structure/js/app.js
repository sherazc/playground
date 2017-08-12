import React from "react";
import ReactDOM from "react-dom";
import Calculator from "./components/Calculator";
import {Provider} from "react-redux";
import store from "./store";

const app = document.getElementById("app");

ReactDOM.render(
    <Provider store={store}>
        <Calculator/>
    </Provider>, app);