import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import Home from "./components/Home";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import NotFound from "./components/NotFound";

class App extends React.Component {
  public render() {
    return (
        <BrowserRouter>
            <div>
                <Navigation/>
                <Switch>
                    <Route path='/' component={Home} exact={true}/>
                    <Route path='/login' component={Login}/>
                    <Route component={NotFound}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
  }
}

export default App;
