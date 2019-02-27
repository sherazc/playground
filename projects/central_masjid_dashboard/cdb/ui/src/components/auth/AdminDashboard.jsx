import React from "react";
import {connect} from "react-redux";
import {mapStateLoginToProps} from "../../store/lib/utils";
import ContainerGridLayout01 from "../layout/ContainerGridLayout01";

const AdminDashboard = (props) => {
    return (
        <ContainerGridLayout01>
            <div>
                {/*<AdminNavigation/>*/}
                test
            </div>
        </ContainerGridLayout01>

    );
};

export default connect(mapStateLoginToProps)(AdminDashboard);
