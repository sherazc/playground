import React from "react";

export default class BoxChildren extends React.Component {
    render() {return(
        <div className="box">
            {this.props.children}
        </div>
    );}
}