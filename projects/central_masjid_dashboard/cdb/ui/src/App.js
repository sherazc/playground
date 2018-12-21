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
import RegisterCompanyUser from "./components/register/RegisterCompanyUser";
import RegisterFinish from "./components/register/RegisterFinish";
import Examples from "./components/Examples";
import Dashboard from "./components/Dashboard";
import Forbidden from "./components/Forbidden";
import Admin from "./components/Admin";
import Navigation from "./components/common/navigation/Navigation";
import AuthRoute from "./components/common/navigation/AuthRoute";
import PageNotFound from "./components/PageNotFound";
import AuthCompanyList from "./components/auth/company/AuthCompanyList";
import AuthCompanyUserList from "./components/auth/company/user/AuthCompanyUserList";
import AuthCompany from "./components/auth/company/AuthCompany";
// import {REGISTER_COMPANY_PREPARE_FOR_CREATE} from "./store/register-company/actions";

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
                        <Navigation/>
                        <Switch>
                            {/*
                            TODO: create an array of all the routes params and then
                            run a loop over them to create Route and AuthRoute components.
                            */}
                            <Route path={`${process.env.PUBLIC_URL}/`} component={Home} exact/>
                            <Route path={`${process.env.PUBLIC_URL}/login`} component={Login}/>

                            <AuthRoute
                                // authenticate={false}
                                // rolesAny={["SUPER_ADMIN"]}
                                path={`${process.env.PUBLIC_URL}/auth/company/list`}
                                component={AuthCompanyList} exact/>

                            <Route
                                path={`${process.env.PUBLIC_URL}/auth/company/:action(create|edit|view)`}
                                render={(props) => {

                                    // console.log("Entered route", props);
                                    if (props.match.params.action === "create") {
                                        // store.dispatch({type: REGISTER_COMPANY_PREPARE_FOR_CREATE});
                                    }

                                    return <AuthCompany {...props} />;
                                }}/>

                            <AuthRoute
                                // authenticate={false}
                                // rolesAny={["ADMIN"]}
                                path={`${process.env.PUBLIC_URL}/auth/company/user/list`}
                                component={AuthCompanyUserList} exact/>
                            <Route path={`${process.env.PUBLIC_URL}/auth/company/user/:action(create|edit|view)`} component={RegisterCompanyUser} exact/>



                            <Route path={`${process.env.PUBLIC_URL}/register/finish`} component={RegisterFinish} exact/>
                            <Route path={`${process.env.PUBLIC_URL}/examples`} component={Examples} exact/>
                            <AuthRoute
                                // authenticate={true}
                                path={`${process.env.PUBLIC_URL}/dashboard`} component={Dashboard} exact/>
                            <Route path={`${process.env.PUBLIC_URL}/forbidden`} component={Forbidden} exact/>
                            <AuthRoute
                                // authenticate={true}
                                exact
                                // rolesAny={["ADMIN"]}
                                path={`${process.env.PUBLIC_URL}/admin`} component={Admin} />
                            <AuthRoute
                                // authenticate={true}
                                // rolesAny={["ADMIN"]}
                                path={`${process.env.PUBLIC_URL}/company/add-user`}
                                exact
                                render={(props) => <RegisterCompanyUser {...props} addUserFlow />}/>
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;