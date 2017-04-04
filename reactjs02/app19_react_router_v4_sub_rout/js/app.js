import React from "react";
import ReactDOM from "react-dom";
import Router from 'react-router/BrowserRouter';
import Match from 'react-router/Match';
import Link from 'react-router/Link';

class App extends React.Component {
    render() {return (
        <Router>
            <div>
                <Link to="/">Home</Link>
                &nbsp;|&nbsp;
                <Link to="/topics">Topics</Link>
                <hr/>
                <Match exactly pattern="/" component={Home}></Match>
                <Match pattern="/topics" component={Topics}></Match>
            </div>
        </Router>
    );}
}

const Home = () => {
    return (
    <div>
        This is home view
    </div>
);};

// using ES6 destructuring technique to get pathname from the object
// passed to Topics by react router
const Topics = ({pathname}) => {
    return (
    <div>
        These are topics
        <br/>
        <Link to={`${pathname}/rendering`}>Rendering</Link>
        &nbsp;|&nbsp;
        <Link to={`${pathname}/component`}>Component</Link>
        <hr/>
        {/* Note: we are creating inline stateless component */}
        <Match pattern={pathname} exactly={true} component={() => (<div>Please select a topic</div>)}/>
        {/* Dynamically creating pattern. Passing parameter as path pattern */}
        <Match pattern={`${pathname}/:topicId`} component={Topic}/>
    </div>
);};

const Topic = ({params}) => {return (
    <div>
        You are looking at topic <b>{params.topicId}</b>
    </div>
);};


const app = document.getElementById("app");
ReactDOM.render(<App/>, app);
