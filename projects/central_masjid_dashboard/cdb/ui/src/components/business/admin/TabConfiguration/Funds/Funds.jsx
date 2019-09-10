import React, {Component} from "react";
import CloseablePanel from "../../../../common/CloseablePanel/CloseablePanel";
// import InputField from "../../../../partials/InputField";

class Funds extends Component {

    constructor(props) {
        super(props);
    }


    componentDidMount() {

    }

    render() {
        return (
            <div>
                <CloseablePanel
                    title="Funds"
                    editMode={true}
                    defaultExpanded={this.props.defaultExpanded}
                    onSave={this.props.onSave}
                    onCancel={this.props.onCancel}>
                    Funds

                    <Parent/>
                </CloseablePanel>
            </div>
        );
    }
}

export default Funds;



class Parent extends Component {
    render() {
        return (
            <div>
                <Child setClick={click => this.clickChild = click}/>
                <button onClick={() => this.clickChild()}>Click</button>
            </div>
        );
    }
}

class Child extends Component {
    constructor(props) {
        super(props);
        this.getAlert = this.getAlert.bind(this);
    }
    componentDidMount() {
        this.props.setClick(this.getAlert);
    }
    getAlert() {
        alert('clicked');
    }
    render() {
        return (
            <h1 ref="hello">Hello</h1>
        );
    }
}