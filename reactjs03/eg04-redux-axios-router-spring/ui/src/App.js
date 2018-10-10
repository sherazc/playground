import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import AllUsers from "./components/AllUsers";

class App extends Component {
    render() {
        return (

            <BrowserRouter>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route path='/' component={Home} exact/>
                        <Route path='/all-users' component={AllUsers}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
