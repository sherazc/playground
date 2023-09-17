import React, {Component} from 'react';
import {Route, Router, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';

import store from "./store";
import history from "./services/app-browse-history";
import Home from "./components/Home/Home";
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
import AdminControl from "./components/business/admin/AdminControl";
import CompanyDashboard from "./components/business/CompanyDashboard/CompanyDashboard";
import CssBaseline from '@material-ui/core/CssBaseline';
import VerifyEmail from "./components/auth/company/VerifyEmail";
import Calendar from './components/business/Calendar/Calendar';
import PrivacyPolicy from "./components/business/PrivacyPolicy/PrivacyPolicy";
import {DashboardSelect} from "./components/business/DashboardSelect/DashboardSelect";
import {ExpenseFrame} from "./components/business/ExpensesFrame/ExpensesFrame";
import {CompanyDashboardV2} from "./components/business/CompanyDashboardV2/CompanyDashboardV2";
// import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import {createMuiTheme, ThemeProvider} from '@material-ui/core/styles';
// import { ThemeProvider } from '@material-ui/core/styles';
// import purple from '@material-ui/core/colors/purple';

/*
const theme = createMuiTheme({
    palette: {
        primary: purple,
        secondary: {
            main: '#f44336',
        },

    },
    typography: {
        useNextVariants: true,
    },
});
*/

setupInterceptor(store);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                {/*
                // Use this if context path or sub dir is defined
                <Router history={history} basename={'/cdb'}>*/}
                <Router history={history}>
                    {/*<MuiThemeProvider theme={theme}>*/}
                        <CssBaseline/>
                        <Loading/>
                        <Alert/>
                        <Switch>
                            {/*
                            TODO: create an array of all the routes params and then
                            run a loop over them to create Route and AuthRoute components.
                            */}
                            <Route path={`${process.env.PUBLIC_URL}/`} component={Home} exact/>

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

                            <Route path={`${process.env.PUBLIC_URL}/auth/register/finish`}
                                   component={RegisterFinish} exact/>

                            <Route path={`${process.env.PUBLIC_URL}/auth/register/verify`}
                                   component={VerifyEmail} exact/>

                            <Route path={`${process.env.PUBLIC_URL}/examples`} component={Examples} exact/>

                            <AuthRoute
                                authenticate={true}
                                path={`${process.env.PUBLIC_URL}/auth/admin`} component={AdminControl} exact/>

                            {/*
                            <Route
                                authenticate={true}
                                path={`${process.env.PUBLIC_URL}/auth/admin`} component={AdminControl} exact/>
                            */}


                            <Route path={`${process.env.PUBLIC_URL}/forbidden`} component={Forbidden} exact/>

                            <Route path={`${process.env.PUBLIC_URL}/404`} component={PageNotFound} exact/>
                            <Route path={`${process.env.PUBLIC_URL}/privacy-policy`} component={PrivacyPolicy} exact/>

                            <Route
                                path={`${process.env.PUBLIC_URL}/calendar/:companyUrl`}
                                component={Calendar}/>

                            <Route
                                path={`${process.env.PUBLIC_URL}/expense/:companyUrl`}
                                component={ExpenseFrame}/>

{/*
                            <Route
                                path={`${process.env.PUBLIC_URL}/:companyDashboardUrl`}
                                component={DashboardSelect}/>
*/}

                            <Route
                                path={`${process.env.PUBLIC_URL}/v2/:companyUrl`}
                                component={CompanyDashboardV2}/>


                            <Route
                                path={`${process.env.PUBLIC_URL}/:companyDashboardUrl`}
                                component={CompanyDashboard}/>



                            {/*

                            <Route
                                path={`${process.env.PUBLIC_URL}/:companyDashboardUrl`}
                                component={CompanyDashboard}/>
*/}


                            <Route component={PageNotFound}/>
                        </Switch>
                    {/*</MuiThemeProvider>*/}
                </Router>
            </Provider>
        );
    }
}

export default App;
