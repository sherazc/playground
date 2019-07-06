import React, {Component} from "react";
import {dateToDisplayDate} from "../../../../../services/utilities";
import CircleProgressBar from "../CircleProgressBar";
import "./Funds.scss"

class Funds extends Component {
    constructor(props) {
        super(props);
        console.log("Funds created", this.props)
    }

    makeFund(fund) {
        const progressPercentage = fund.current / fund.goal * 100;
        return (
            <div className="fundContainer">
                <div className="positionCircleProgressBar">
                    <CircleProgressBar percentage={progressPercentage}/>
                </div>
                <div className="positionFundsGrid">
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
