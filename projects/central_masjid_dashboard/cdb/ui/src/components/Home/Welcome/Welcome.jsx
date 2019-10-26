import React, {Component} from "react";
import {Redirect} from "react-router";
import {
    InputLabel, MenuItem, FormControl, Select
} from '@material-ui/core';

import styles from "./Welcome.module.scss";
import Logo from "../Logo";

class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState();
        this.onSelectCompany = this.onSelectCompany.bind(this);
    }

    createInitialState() {
        return {
            selectedCompanyUrl: ""
        };
    }

    onSelectCompany(event) {
        this.setState({
            selectedCompanyUrl: event.target.value
        });
    }

    getRedirectUrl(url) {
        if (url) {
            if (url.startsWith('/')) {
                return `${process.env.PUBLIC_URL}${url.trim()}`;
            } else {
                return `${process.env.PUBLIC_URL}/${url.trim()}`;
            }
        }
    }

    render() {
        const redirectUrl = this.getRedirectUrl(this.state.selectedCompanyUrl);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }

        const {companies} = this.props;

        return (
            <div className={styles.container}>
                <Logo className={styles.logo}/>
                <div className={styles.companyHeading}>
                    MASJID DASHBOARD
                </div>
                <div style={{textAlign: "center", marginBottom: "3vw"}}>
                <FormControl>
                    <InputLabel htmlFor="companySelect" className={styles.selectLabel}>
                        Select Masjid
                    </InputLabel>
                    <Select
                        value={this.state.selectedCompanyUrl}
                        onChange={this.onSelectCompany}
                        inputProps={{
                            name: 'selectedCompanyUrl',
                            id: 'selectedCompanyUrl'
                        }}
                        className={styles.selectBox}>
                        {companies.map((company, index) => {
                            return (
                                <MenuItem
                                    key={index} value={company.url}>
                                    {company.name}
                                </MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                </div>
            </div>
        );
    }
}

export default Welcome;