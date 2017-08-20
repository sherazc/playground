import React from "react"

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
