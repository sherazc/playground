import React, {Component} from "react";

class Funds extends Component {
    constructor(props) {
        super(props);
        console.log("Funds created", this.props)
    }

    makeFund(fund) {
        return (
            <div>
                <div>{fund.name}</div>
                <table border="1">
                    <tbody>
                    <tr>
                        <th>Target</th>
                        <td>{fund.goal}</td>
                    </tr>
                    <tr>
                        <th>End Date</th>
                        <td>{fund.endDate}</td>
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
