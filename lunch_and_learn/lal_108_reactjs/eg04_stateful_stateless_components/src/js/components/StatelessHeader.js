import React from "react";

/*
Stateless component are just function that takes in properties
as argument and return JSX
*/
const StatelessHeader =  (props) => {
    return (
        <nav className="navbar navbar-default fixed-top">
            <a className="navbar-brand" href="#">
                {props.title}
            </a>
        </nav>
    );
};

export default StatelessHeader;