import React from "react";
import PropTypes from 'prop-types';


export default class MyComponent extends React.Component {
    render() {
        return (
            <div className="boxGreen">
                staticString = {this.props.staticString}
                <hr/>

                varString = {this.props.varString}

                <hr/>
                varInt = {this.props.varInt}

                <hr/>
                varArray =
                <ul>
                    {
                        this.props.varArray.map(
                            (item, index) => <li key={index}>{item}</li>
                        )
                    }
                </ul>
                <hr/>
                varObject = (name={this.props.varObject.name}, salary={this.props.varObject.salary})
                <hr/>
                varFunction = {this.props.varFunction()}
                <hr/>
                Component children =
                <br/>
                {this.props.children}
            </div>
        );
    }
};

MyComponent.propTypes = {
    staticString: PropTypes.string.isRequired,
    varString: PropTypes.string,
    varInt: PropTypes.number,
    varArray: PropTypes.array,
    varObject: PropTypes.object,
    varFunction: PropTypes.func.isRequired

};
