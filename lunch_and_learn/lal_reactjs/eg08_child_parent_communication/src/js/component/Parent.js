import React from "react"
import Child from "./Child"

export default class Parent extends React.Component {

    constructor() {
        super();
        this.state = {
            parentValue: "",
            childValue: ""
        }
    }

    changeParentValue(event) {
        this.setState({parentValue: event.target.value});
    }

    changeChildValueInParent(childValue) {
        this.setState({childValue});
    }

    render() {
        return (
            <div className="boxRed">
                <h3>Parent Component</h3>
                Child Value: {this.state.childValue}
                <br/>
                <input value={this.state.parentValue}
                       onChange={this.changeParentValue.bind(this)}/>
                <hr/>
                <Child
                    parentValue={this.state.parentValue}
                    childValue={this.state.childValue}
                    changeChildValueInParent={this.changeChildValueInParent.bind(this)}/>
            </div>
        );
    }
};
