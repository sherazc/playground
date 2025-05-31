import React from "react";
import ReactDOM from "react-dom";
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';
import Miss from 'react-router/Miss';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <Link to="/">Home</Link>
                    &nbsp;|&nbsp;
                    <Link to="/bad-page-name">Bad Page Name</Link>
                    <hr/>
                    <Match exactly pattern="/" component={Home}/>
                    {/*
                     Miss: Component to show if no matches found
                     */}
                    <Miss component={UnknownView}/>
                </div>
            </Router>
        );
    }
}

const Home = () => {return (
    <div>
        Home View
    </div>
);};

const UnknownView = () => {return (
    <div>
        View Not found
    </div>
);};

const app = document.getElementById("app");
ReactDOM.render(<App/>, app);