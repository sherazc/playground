import React, {Component} from "react";
// import styles from "./Layout02.module.scss";

class Layout02 extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                {this.props.children}
            </div>
        );
    }
}

export default Layout02;
