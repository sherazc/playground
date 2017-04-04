import React from "react"

export default class ComponentA extends React.Component {
    constructor() {
        super();
        this.state = {counter: 0}
    }

    render() {
        setTimeout(() => {
            this.setState({counter: this.state.counter + 1});
        }, 1000);

        return(
            <div style={{fontSize: "40px", fontWeight: 100}}>
                Counter = {this.state.counter}
            </div>
        );
    }
}