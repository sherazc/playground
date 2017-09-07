import React from "react"
import Child from "./Child"

export default class Parent extends React.Component {
    constructor() {
        super();
        this.state = {
            parentValue: ""
        }
    }

    changeParentValue(event) {
        this.setState({parentValue: event.target.value});
    }

    render() {
        return (
            <div className="boxRed">
                <h3>Parent Component</h3>
                <input value={this.state.parentValue}
                       onChange={this.changeParentValue.bind(this)}/>
                <hr/>
                <Child parentValue={this.state.parentValue}/>
            </div>
        );
    }
};
