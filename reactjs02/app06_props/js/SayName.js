import React from "react"

export default class SayName extends React.Component {
    render() {
        return (
            <h1>Hi my name is {this.props.name}</h1>
        );
    }
}