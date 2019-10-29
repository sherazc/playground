import React, {Component} from "react";
import Funds from "./Funds/Funds";
import Expenses from "./Expenses/Expenses";
import styles from "./Accounts.module.scss"

const TOTAL_SLIDES = 2;



/*
<Expenses expenses={this.props.centralControl.expenses}/>,
<Funds funds={this.props.centralControl.funds}/>,
*/

class Accounts2 extends Component {

    constructor(props) {
        super(props);

        this.animationSeconds = 1;
        this.animationStaySeconds = 5;
        this.currentSlide = 0;

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                one two three
            </div>
        );
    }
}

export default Accounts2;
