import React, {Component} from "react";
import Funds from "./Funds";
import Expenses from "./Expenses";
import "./Accounts.scss"


class Accounts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fundsClasses : "slideUp"
        };
        this.slideDownAnimate = this.slideDownAnimate.bind(this);
        this.slideUpAnimate = this.slideUpAnimate.bind(this);
    }

    slideDownAnimate() {
        this.setState({fundsClasses: "slideDown"});
    }

    slideUpAnimate() {
         this.setState({fundsClasses: "slideUp"});
    }

    render() {
        console.log(this.props.centralControl);
        return (
            <div>
                <button onClick={this.slideDownAnimate}>Animate Down</button>
                <button onClick={this.slideUpAnimate}>Animate Up</button>
                <div className="heading1">Expenses</div>
                <div className={this.state.fundsClasses} style={{animationDuration: "5s"}}>
                    <Funds/>
                </div>
                <Expenses/>
            </div>
        );
    }
}

export default Accounts;