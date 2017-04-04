import React from "react"

export default class MyComponent extends React.Component {
    constructor() {
        super();
        this.state = {stateNumber: 1};
    }

    componentWillMount() {
        console.log("componentWillMount()");
    }
    componentDidMount() {
        console.log("componentDidMount()");
    }

    // TODO: look into it. it's not getting called
    componentWillReceiveProps(nextProps) {
        console.log("componentWillReceiveProps(nextProps)", nextProps);
    }

    // this method must return boolean if component should update
    shouldComponentUpdate(nextProps, nextState) {
        console.log("shouldComponentUpdate(nextProps, nextState)", nextProps, nextState);
        return true;
    }
    componentWillUpdate(nextProps, nextState) {
        console.log("componentWillUpdate(nextProps, nextState)", nextProps, nextState);
    }
    componentDidUpdate(previousProps, previousState) {
        console.log("componentDidUpdate(previousProps, previousState)",
            previousProps, previousState);
    }
    componentWillUnmount() {
        console.log("componentWillUnmount()");
    }

    updateComponentState() {
        this.setState({stateNumber: this.state.stateNumber + 1});
    }

    render() {return(
        <div className="paddedBoxBlue">
            <div>
                {this.props.componentName} state number = {this.state.stateNumber}
            </div>
            <div>
                <button className="btn btn-primary"
                        onClick={this.updateComponentState.bind(this)}>
                    Update state
                </button>
            </div>
        </div>
    );}
}
MyComponent.propType = {
    componentName: React.PropTypes.string
};
