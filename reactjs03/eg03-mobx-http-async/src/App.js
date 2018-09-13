import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Eg01 from "./components/Eg01";
import NotFound from "./components/NotFound";
import Eg02 from "./components/Eg02";

class App extends Component {
    render() {
        return (

            <BrowserRouter>
                <div>
                    <Navigation/>
                    <Switch>
                        <Route path='/' component={Home} exact/>
                        <Route path='/eg01' component={Eg01}/>
                        <Route path='/eg02' component={Eg02}/>

                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
