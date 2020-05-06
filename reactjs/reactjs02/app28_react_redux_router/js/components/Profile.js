import React from "react"
import {connect} from "react-redux";

const Profile = (props) => {
    return(
        <div className="paddedBoxGreen">
            <p style={{fontWeight: "bold"}}>
                Profile
            </p>
            <p>
                Name: {props.profile.name}
                <br/>
                Position: {props.profile.position}
                <br/>
                branch: {props.profile.branch}
                <br/>
                Department: {props.profile.department}
                <br/>

            </p>
        </div>
    );
};

const mapStateToProps = (globalState) => {
    return ({
        profile: globalState.profile
    });
};

export default connect(mapStateToProps, null)(Profile);



