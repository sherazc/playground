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
import Examples from "./components/Examples";
import Forbidden from "./components/Forbidden";
import AuthRoute from "./components/common/navigation/AuthRoute";
import PageNotFound from "./components/PageNotFound";
import AuthCompanyList from "./components/auth/company/AuthCompanyList";
import AuthCompanyUserList from "./components/auth/company/user/AuthCompanyUserList";
import AuthCompany from "./components/auth/company/AuthCompany";
import AuthCompanyUser from "./components/auth/company/user/AuthCompanyUser";
import RegisterFinish from "./components/auth/company/RegisterFinish";
import Dashboard from "./components/auth/AdminDashboard";
import CompanyDashboard from "./components/business/CompanyDashboard";

setupInterceptor(store);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {/*
                // Use this if context path or sub dir is defined
                <Router history={history} basename={'/cdb'}>*/}
                <Router history={history}>
                    <div className="container">
                        <Loading/>
                        <Alert/>
                        <Switch>
                            {/*
                            TODO: create an array of all the routes params and then
                            run a loop over them to create Route and AuthRoute components.
                            */}
                            <Route path={`${process.env.PUBLIC_URL}/`} component={Home} exact/>

                            <Route path={`${process.env.PUBLIC_URL}/login`} component={Login}/>

                            <AuthRoute
                                authenticate={true}
                                rolesAny={["SUPER_ADMIN"]}
                                path={`${process.env.PUBLIC_URL}/auth/company/list`}
                                component={AuthCompanyList} exact/>

                            <Route
                                path={`${process.env.PUBLIC_URL}/auth/company/:action(create|edit|view)`}
                                component={AuthCompany}/>

                            <AuthRoute
                                authenticate={true}
                                path={`${process.env.PUBLIC_URL}/auth/company/user/list/:action(all|current)`}
                                component={AuthCompanyUserList} exact/>

                            <Route
                                path={`${process.env.PUBLIC_URL}/auth/company/user/:action(create|edit|view|profile)`}
                                component={AuthCompanyUser} exact/>

                            <Route path={`${process.env.PUBLIC_URL}/auth/register/finish`} component={RegisterFinish} exact/>

                            <Route path={`${process.env.PUBLIC_URL}/examples`} component={Examples} exact/>

                            <AuthRoute
                                authenticate={true}
                                path={`${process.env.PUBLIC_URL}/auth/dashboard`} component={Dashboard} exact/>
                            <Route path={`${process.env.PUBLIC_URL}/forbidden`} component={Forbidden} exact/>

                            <Route path={`${process.env.PUBLIC_URL}/404`} component={PageNotFound} exact/>

                            <Route
                                path={`${process.env.PUBLIC_URL}/:companyDashboardUrl`}
                                component={CompanyDashboard}/>

                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;