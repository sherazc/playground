import React, {Component} from "react";
import Footer02 from "../Footer02/Footer02";
import Header02 from "../Header02/Header02";


class Layout02 extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                <Header02/>
                <div style={{padding: "25px"}}>
                    {this.props.children}
                </div>
                <Footer02/>
            </div>
        );
    }
}

export default Layout02;
