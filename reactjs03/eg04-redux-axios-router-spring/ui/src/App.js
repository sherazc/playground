import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import AllUsers from "./components/AllUsers";
import AddUser from "./components/AddUser";
import Counter from "./components/Counter";

class App extends Component {
    render() {
        return (

            <BrowserRouter>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route path='/' component={Home} exact/>
                        <Route path='/all-users' component={AllUsers}/>
                        <Route path='/add-user' component={AddUser}/>
                        <Route path='/counter' component={Counter}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
