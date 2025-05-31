var React = require("react");
var ReactDOM = require("react-dom");
var AppAction = require("./actions/AppActions");
var AppStore = require("./stores/AppStore");
var AppApi = require("./utils/AppApi");


function getAppState() {
    return {};
}

var App = React.createClass({
    getInitialState : function () {
        return getAppState();
    },
    componentDidMount: function () {
        AppStore.addChangeListener(this._onChange);
    },
    componentUnmount: function () {
        AppStore.removeChangeListner(this._onChange);
    },
    render: function() {
        return(
            <div>
                My App
            </div>
        );
    },
    _onChange: function () {
        this.setState(getAppState());
    }
});

// module.exports = App;


ReactDOM.render(<App/>, document.getElementById("app"))


/*
import React from "react";


import ReactDOM from "react-dom";


import {Dispatcher} from "flux";

class App extends React.Component {
    render() {
        return (
            <div>
            </div>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);
*/