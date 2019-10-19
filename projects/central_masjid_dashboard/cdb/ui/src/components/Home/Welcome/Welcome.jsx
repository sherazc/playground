import React, {Component} from "react";
import {Redirect} from "react-router";
import {
    TextField, InputLabel, MenuItem, FormControl, Select
} from '@material-ui/core';

import styles from "./Welcome.module.scss";

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
        console.log(event.target.value);
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
            <div>
                <div className={styles.companyHeading}>
                    Central Masjid Dashboard
                </div>
                <FormControl>
                    <InputLabel htmlFor="companySelect" className={styles.selectLabel}>
                        Select Dashboard
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

                <br/>
                <a href="/static/rod-widget/index.html">ROD Widget</a>
            </div>
        );
    }
}

export default Welcome;