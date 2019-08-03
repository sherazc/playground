import React, { Component } from "react";
import { dateToDisplayDate } from "../../../../../services/utilities";
import CircleProgressBar from "../CircleProgressBar/CircleProgressBar";
import styles from "./Funds.module.scss"

class Funds extends Component {
    makeFund(fund) {
        const progressPercentage = fund.current / fund.goal * 100;
        return (
            <div className={styles.fundContainer}>
                <div className={[styles.heading3, styles.fundHeader].join(' ')}>
                    {fund.name}
                </div>
                <div className={styles.fundContent}>
                    <div className={styles.fundContainerLeft}>
                        {this.makeFundGrid(fund)}
                    </div>
                    <div className={styles.fundContainerRight}>
                        <CircleProgressBar percentage={progressPercentage} />
                    </div>
                </div>
            </div>

        );
    }

    makeFundGrid(fund) {

        //
        return (
            <table className={styles.fundGrid}>
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
        );
    }

    render() {
        const { funds } = this.props;
        if (!funds || funds.length < 1) {
            return <div>No Funds Found</div>
        }

        return (
            <div>
                {this.makeFund(funds[0])}
                {this.makeFund(funds[1])}
            </div>
        );
    }
}

export default Funds;
