import React from "react";
import Header from "./header/Header";

export default class Layout extends React.Component {
    constructor() {
        super();
        this.state = {title: "Welcome"};
    }
    // Called by Header but context is Layout. because of bind(this)
    changeTitle(title) {
        // Because of ES6 we don't have to do:
        // this.setState({title:title});
        // Instead we can do:
        this.setState({title});
    }

    render() {return (
        <div>
            <Header changeHeaderTitle={this.changeTitle.bind(this)}
                    titleHeading={this.state.title} />
        </div>
    );}
}
