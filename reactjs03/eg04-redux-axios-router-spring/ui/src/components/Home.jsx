import React, {Component} from "react";
import {connect} from "react-redux";

class Home extends Component{
    render() {
        return (
            <div>
                <h1>Home</h1>
                <h3>Counter</h3>
                {this.props.count}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        count: state.countReducer.count
    };
};

export default connect(mapStateToProps)(Home);
