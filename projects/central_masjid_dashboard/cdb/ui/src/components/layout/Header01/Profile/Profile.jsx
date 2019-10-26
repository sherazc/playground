import React, {Component} from "react";
import styles from "./Profile.module.scss";
import {NavLink} from 'react-router-dom';

const baseLinkUrl = process.env.PUBLIC_URL;

class Profile extends Component {

    render() {
        return (
            <div className={styles.container}>
                Profile
            </div>
        );
    }
}


export default Profile;