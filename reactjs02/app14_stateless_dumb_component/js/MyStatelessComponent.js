import React from "react";

// State less components are just a function. We are using ES6 fat arrow function
// Since it do not extends React.Component so it do not have this.props,
// this.refs, this.state, and other React.Component's lifecycle methods
// React passes props object to the function
// export class MyStatelessComponent extends React.Component {
export const MyStatelessComponent = (props) => {
    let componentStyle = {
        border: "1px solid #265534",
        padding: "10px",
        background: "#3f8553",
        color: "white",
        margin: "20px",
        width: "200px"
    };
    return (
        <div style={componentStyle}>
            <b>name</b> = {props.name}
            <br/>
            <b>age</b> = {props.age}
        </div>
    );
};