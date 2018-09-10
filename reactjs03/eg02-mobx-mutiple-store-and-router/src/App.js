import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Todo from "./components/Todo";
import UserProfile from "./components/UserProfile";
import NotFound from "./components/NotFound";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
            <Navigation/>
            <Switch>
                <Route path='/' component={Home} exact/>
                <Route path='/todo' component={Todo}/>
                <Route path='/user-profile' component={UserProfile}/>
                <Route component={NotFound}/>
            </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
