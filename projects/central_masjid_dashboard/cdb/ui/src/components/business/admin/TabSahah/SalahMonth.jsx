import React, {Component} from "react";
import {withStyles} from '@material-ui/core/styles';

const styles = theme => {

    const salah_table = {
        textAlign: "center",
        display: "inline-block",
        border: "0px solid #878787",
        borderSpacing: 0,
        borderCollapse: "collapse",
        "& th, td": {
            border: "1px solid #878787"
        },
        "& tr:nth-child(even)": {
            backgroundColor: "#ededed",
        },
        "& tr:nth-child(odd)": {
            backgroundColor: "#ffffff",
        },
        "& tr:hover": {
            backgroundColor: "#dce0f4",
        }
    };

    const single_month_grid = {
        textAlign: "center",
        marginTop: "50px"
    };

    const month_name_cell = {
        fontSize: "3em",
        backgroundColor: "#6392b0",
        color: "white",
        fontWeight: "100",
        border: "1px solid #4f7d9b"
    };

    const salah_name_row = {
        "& th": {
            fontSize: "1.5em",
            backgroundColor: "#cdb622",
            color: "white",
            fontWeight: "200",
            border: "1px solid #a99221",
            whiteSpace: "nowrap",
            padding: "8px",
            textAlign: "center",
        }
    };

    const azan_iqmah_row = {
        "& td": {
            backgroundColor: "#7e7e7e",
            color: "white",
            border: "1px solid #646464",
            whiteSpace: "nowrap",
            padding: "8px",
            textAlign: "center",
        }
    };

    const border_dim_right = {
        borderRight: "1px solid #e0e0e0"
    };

    const border_dim_left = {
        borderLeft: "1px solid #e0e0e0"
    };

    return {
        salah_table, single_month_grid, month_name_cell, salah_name_row,
        azan_iqmah_row, border_dim_right, border_dim_left
    }
};

class SahahMonth extends Component {

    render() {
        const classes = this.props.classes;
        return (
            <div className={classes.single_month_grid}>
                <table className={classes.salah_table}>
                    <thead>
                    <tr>
                        <th colSpan="100%" className={classes.month_name_cell}>Month Name</th>
                    </tr>
                    <tr className={classes.salah_name_row}>
                        <th>Date</th>
                        <th colSpan="2">Fajr</th>
                        <th>Shurooq</th>
                        <th colSpan="2">Zuhar</th>
                        <th colSpan="2">Asr</th>
                        <th>Maghrib</th>
                        <th colSpan="2">Isha</th>
                    </tr>
                    <tr className={classes.azan_iqmah_row}>
                        <td></td>
                        <td className={classes.border_dim_right}>Azan</td>
                        <td className={classes.border_dim_left}>Iqmah</td>
                        <td></td>
                        <td className={classes.border_dim_right}>Azan</td>
                        <td className={classes.border_dim_left}>Iqmah</td>
                        <td className={classes.border_dim_right}>Azan</td>
                        <td className={classes.border_dim_left}>Iqmah</td>
                        <td>Azan</td>
                        <td className={classes.border_dim_right}>Azan</td>
                        <td className={classes.border_dim_left}>Iqmah</td>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>
                            a
                        </td>
                        <td className="border_dim_right">
                            b
                        </td>
                        <td className="border_dim_left">
                            c
                        </td>
                        <td>
                            d
                        </td>
                        <td className="border_dim_right">
                            e
                        </td>
                        <td className="border_dim_left">
                            f
                        </td>
                        <td className="border_dim_right">
                            g
                        </td>
                        <td className="border_dim_left">
                            h
                        </td>
                        <td>
                            i
                        </td>
                        <td className="border_dim_right">
                            j
                        </td>
                        <td className="border_dim_left">
                            k
                        </td>
                    </tr>
                    <tr>
                        <td>
                            a
                        </td>
                        <td className="border_dim_right">
                            b
                        </td>
                        <td className="border_dim_left">
                            c
                        </td>
                        <td>
                            d
                        </td>
                        <td className="border_dim_right">
                            e
                        </td>
                        <td className="border_dim_left">
                            f
                        </td>
                        <td className="border_dim_right">
                            g
                        </td>
                        <td className="border_dim_left">
                            h
                        </td>
                        <td>
                            i
                        </td>
                        <td className="border_dim_right">
                            j
                        </td>
                        <td className="border_dim_left">
                            k
                        </td>
                    </tr>
                    </tbody>
                </table>

            </div>

        );
    }
}

export default withStyles(styles)(SahahMonth);