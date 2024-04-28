import React, { Component } from "react";
import {filterEnabledItems} from "../../../../../services/utilities";
import CircleProgressBar from "../CircleProgressBar/CircleProgressBar";
import styles from "./Funds.module.scss"
import {dateToDisplayDate, isoDateToJsDate} from "mdb-core-js";

class Funds extends Component {
    makeFund(fund) {
        const progressPercentage = fund.current / fund.goal * 100;
        return (
            <div className={`${styles.container} ${this.props.fundClassName}`}>
                <div className={`${styles.heading5} ${styles.header}`}>
                    {fund.name}
                </div>
                <div className={styles.content}>
                    <div className={styles.containerLeft}>
                        {this.makeFundGrid(fund)}
                    </div>
                    <div className={styles.containerRight}>
                        <CircleProgressBar percentage={progressPercentage} />
                    </div>
                </div>
            </div>

        );
    }

    makeFundGrid(fund) {
        return (
            <table className={styles.fundGrid}>
                <tbody>
                    <tr>
                        <th>Target</th>
                        <td>{fund.goal}</td>
                    </tr>
                    <tr>
                        <th>End Date</th>
                        <td>{dateToDisplayDate(isoDateToJsDate(fund.endDate))}</td>
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
        );
    }

    render() {
        const fundsAll = this.props.funds;
        const funds = filterEnabledItems(fundsAll);
        if (!funds || funds.length < 1) {
            return <div>No Funds Found</div>
        }

        return (
            <div className={this.props.className} style={this.props.style}>
                {this.makeFund(funds[0])}
                {funds.length > 1 && this.makeFund(funds[1])}
            </div>
        );
    }
}

export default Funds;
