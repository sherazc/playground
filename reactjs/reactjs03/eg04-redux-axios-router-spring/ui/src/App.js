import React, {Component} from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import AllUsers from "./components/AllUsers";
import AddUser from "./components/AddUser";
import Counter from "./components/Counter";
import {Provider} from 'react-redux';
import store from "./store";
import history from "./app-browse-history";
import setupInterceptor from "./http-interceptor";

setupInterceptor();


class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div>
                        <Navigation/>
                        <Switch>
                            <Route path='/' component={Home} exact/>
                            <Route path='/all-users' component={AllUsers}/>
                            <Route path='/add-user' component={AddUser}/>
                            <Route path='/counter' component={Counter}/>
                        </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
