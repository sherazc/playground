import React, {Component} from "react";
import {dateToDisplayDate} from "../../../../services/utilities";
/*

var path = document.querySelector('.squiggle-animated path');
var length = path.getTotalLength();
// Clear any previous transition
path.style.transition = path.style.WebkitTransition =
  'none';
// Set up the starting positions
path.style.strokeDasharray = length + ' ' + length;
path.style.strokeDashoffset = length;
// Trigger a layout so styles are calculated & the browser
// picks up the starting position before animating
path.getBoundingClientRect();
// Define our transition
path.style.transition = path.style.WebkitTransition =
  'stroke-dashoffset 2s ease-in-out';
// Go!
path.style.strokeDashoffset = '0';


 */
class Funds extends Component {
    constructor(props) {
        super(props);
        console.log("Funds created", this.props)
    }

    makeFund(fund) {
        return (
            <div>
                <div>{fund.name}</div>
                <table border="1" style={{margin: "0 auto"}}>
                    <tbody>
                    <tr>
                        <th>Target</th>
                        <td>{fund.goal}</td>
                    </tr>
                    <tr>
                        <th>End Date</th>
                        <td>{dateToDisplayDate(fund.endDate)}</td>
                    </tr>

                    <tr>
                        <th>Remaining</th>
                        <td>{fund.goal - fund.current}</td>
                    </tr>
                    {
                        fund.pledge && fund.pledge > 0 && (
                            <tr>
                                <th>Pledges</th>
                                <td>{fund.pledge}</td>
                            </tr>
                        )
                    }
                    <tr>
                        <th>Collected</th>
                        <td>{fund.current}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        const {funds} = this.props;
        if (!funds || funds.length < 1) {
            return <div>No Funds Found</div>
        }

        return (
            <div>
                {this.makeFund(funds[0])}
                <hr/>
                {this.makeFund(funds[1])}
            </div>
        );
    }
}

export default Funds;
