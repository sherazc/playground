import React from "react";
import ReactDOM from "react-dom";
import Router from "react-router/BrowserRouter";
import Match from "react-router/Match";
import Link from "react-router/Link";

import Home from "./components/Home";
import About from "./components/About";
import Topics from "./components/Topics";

class App extends React.Component {
    render() {
        return (
            /*
             Router: Main context of a router application. Everything should enclosed in
            */
            <Router>
                <div>
                    <ul>
                        {/*
                         Link: instead of making <a>, <Link> tag is used
                        */}
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/topics">Topics</Link></li>
                    </ul>
                    <hr/>
                    {/*
                     Match: show the component if URL pattern matches
                    */}
                    <Match exactly pattern="/" component={Home}/>
                    <Match pattern="/about" component={About}/>
                    <Match pattern="/topics" component={Topics}/>
                </div>

            </Router>
        );
    }
}
const app = document.getElementById("app");
ReactDOM.render(<App/>, app);