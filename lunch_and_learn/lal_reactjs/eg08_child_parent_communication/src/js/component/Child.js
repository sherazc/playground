import React from "react"

export default class Child extends React.Component {
    changeChildValue(event) {
        this.props.changeChildValueInParent(event.target.value);
    }

    render() {
        return (
            <div className="boxYellow">
                <h4>Child Component</h4>
                Parent Value: {this.props.parentValue}
                <br/>
                <input value={this.props.childValue}
                       onChange={this.changeChildValue.bind(this)}/>
            </div>
        );
    }
};
