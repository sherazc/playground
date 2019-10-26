import React from "react";
import {Icon} from '@material-ui/core';
import {NavLink} from 'react-router-dom';
import styles from "./LinkLeftBorderMaterialIcon.module.scss";

const LinkLeftBorderMaterialIcon = (props) => {

    let linkClass = styles.light;

    if (props.dark) {
        linkClass = styles.dark;
    }

    return (
        <NavLink to={props.link} exact className={linkClass} onClick={props.onClick}>
            {props.icon &&
                <Icon style={{fontSize: "20px", marginBottom: "-5px", marginRight: "5px"}}>{props.icon}</Icon>
            }
            {props.text && <span>{props.text}</span>}

        </NavLink>
    );

};

export default LinkLeftBorderMaterialIcon;