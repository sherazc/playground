import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Navigation from "./components/Navigation";
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from "./store";
import history from "./services/app-browse-history";
import './App.scss';
import Home from "./components/Home";
import Login from "./components/Login";
import RegisterCompany from "./components/RegisterCompany";

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="container">
                        <Navigation/>
                        <Switch>
                            <Route path='/' component={Home} exact/>
                            <Route path='/login' component={Login}/>
                            <Route path='/register' component={RegisterCompany}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;