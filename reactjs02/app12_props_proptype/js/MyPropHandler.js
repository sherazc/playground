import React from "react";

export default class MyPropHandler extends React.Component {
    constructor(props) {
        super();
        this.dateString = props.propDate.toDateString()
            + " " + props.propDate.toTimeString();
    }
    render() {
        return (
            <div >
                <ul>
                    <li>
                        propObject =
                        name: {this.props.propObject.name}
                        age: {this.props.propObject.age}
                    </li>
                    <li>
                        propArray = {
                        this.props.propArray.map((arrayElement, index) => {
                            return (
                                <span key={index}> {arrayElement} |</span>
                            );
                        })}
                    </li>
                    <li>propInt = {this.props.propInt}</li>
                    <li>propString = {this.props.propString}</li>
                    <li>propDate = {this.dateString}</li>
                    <li>propDouble = {this.props.propDouble}</li>
                    <li>children = {this.props.children}</li>
                </ul>
            </div>
        );
    }
}

MyPropHandler.propTypes = {
    propObject: React.PropTypes.object,
    propArray: React.PropTypes.array,
    propInt: React.PropTypes.number,
    propString: React.PropTypes.string,
    propDate: React.PropTypes.object,
    propDouble: React.PropTypes.number,
    children: React.PropTypes.element.isRequired
};
