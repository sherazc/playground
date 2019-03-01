import React, {Component} from "react";

class SahahMonth extends Component {
    render() {
        return (
            <div className="single_month_grid">
                <table styles="text-align: center; display: inline-block">
                    <tr>
                        <th colspan="100%" className="month_name_cell">monthName</th>
                    </tr>
                    <tr className="salah_name_row">
                        <th>Date</th>
                        <th colspan="2">Fajr</th>
                        <th>Shurooq</th>
                        <th colspan="2">Zuhar</th>
                        <th colspan="2">Asr </th>
                        <th>Maghrib</th>
                        <th colspan="2">Isha </th>
                    </tr>
                    <tr className="azan_iqmah_row">
                        <td></td>
                        <td className="border_dim_right">Azan</td>
                        <td className="border_dim_left">Iqmah</td>
                        <td></td>
                        <td className="border_dim_right">Azan</td>
                        <td className="border_dim_left">Iqmah</td>
                        <td className="border_dim_right">Azan</td>
                        <td className="border_dim_left">Iqmah</td>
                        <td>Azan</td>
                        <td className="border_dim_right">Azan</td>
                        <td className="border_dim_left">Iqmah</td>
                    </tr>
                    <tr ngFor="let salahDay of monthSalahs">
                    <td>
                    </td>
                    <td className="border_dim_right">
                    </td>
                    <td className="border_dim_left">
                    </td>
                    <td>
                    </td>
                    <td className="border_dim_right">
                    </td>
                    <td className="border_dim_left">
                    </td>
                    <td className="border_dim_right">
                    </td>
                    <td className="border_dim_left">
                    </td>
                    <td>
                    </td>
                    <td className="border_dim_right">
                    </td>
                    <td className="border_dim_left">
                    </td>
                </tr>
            </table>

    </div>

    );
    }
}

export default SahahMonth;