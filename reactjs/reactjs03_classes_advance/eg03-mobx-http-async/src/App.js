import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Eg01 from "./components/Eg01";
import Eg02 from "./components/Eg02";
import Eg03 from "./components/Eg03";
import Eg04 from "./components/Eg04";
import Eg05 from "./components/Eg05";

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
                        <Route path='/eg03' component={Eg03}/>
                        <Route path='/eg04' component={Eg04}/>
                        <Route path='/eg05' component={Eg05}/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
