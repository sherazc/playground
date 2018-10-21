import React from "react";
import {connect} from "react-redux";
import "./Loading.scss"

const Loading = (props) => {
    const getLoadingDiv = () => {
        if (props.loading.show) {
            return <div className="loading">Loading&#8230;</div>;
        } else {
            return <></>;
        }
    };

    return getLoadingDiv();
};

const mapStateToProps = state => {
    return {
        loading: state.common.loading
    };
};

export default connect(mapStateToProps)(Loading);
