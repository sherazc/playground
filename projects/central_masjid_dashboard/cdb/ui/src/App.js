import React, {Component} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';

import store from "./store";
import history from "./services/app-browse-history";
import './App.scss';
import Home from "./components/Home";
import Login from "./components/Login";
import Alert from "./components/alert/Alert";
import Loading from "./components/loading/Loading";
import setupInterceptor from "./services/http-interceptor";
import RegisterCompany from "./components/register/RegisterCompany";
import RegisterCompanyUser from "./components/register/RegisterCompanyUser";
import RegisterFinish from "./components/register/RegisterFinish";
import Examples from "./components/Examples";
import Dashboard from "./components/Dashboard";
import Forbidden from "./components/Forbidden";
import Admin from "./components/Admin";
import Navigation from "./components/common/navigation/Navigation";

setupInterceptor(store);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="container">
                        <Loading/>
                        <Alert/>
                        <Navigation/>
                        <Switch>
                            <Route path='/' component={Home} exact/>
                            <Route path='/login' component={Login}/>
                            <Route path='/register' component={RegisterCompany} exact/>
                            <Route path='/register/user' component={RegisterCompanyUser} exact/>
                            <Route path='/register/finish' component={RegisterFinish} exact/>
                            <Route path='/examples' component={Examples} exact/>
                            <Route path='/dashboard' component={Dashboard} exact/>
                            <Route path='/forbidden' component={Forbidden} exact/>
                            <Route path='/admin' component={Admin} exact/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;