import React from "react";

/*
Stateful components extends React.Component class
and have a render method that return JSX.

Stateful components have
- all lifecycle method
- state object
- setState method
 */
export default class StatefulHome extends React.Component {
    constructor() {
        super();
        this.state = {
            counter: 100
        };

        setInterval(()=>{
            this.setState({counter: this.state.counter + 1});
        }, 1000);
    }

    render() {
        return(
            <div>
                <h1>Stateful Home Component
                <br/>
                State Counter: {this.state.counter}
                </h1>
            </div>
        );
    }
}