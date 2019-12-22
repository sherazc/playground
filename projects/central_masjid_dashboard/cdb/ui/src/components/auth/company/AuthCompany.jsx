import React, {Component} from "react";
import {connect} from "react-redux";
import StateSelect from "../../partials/StateSelect";
import {MODE_EDIT, MODE_VIEW} from "../../partials/InputField";
import {NavLink} from "react-router-dom";
import {
    createCompanyAction,
    prepareCompanyToCreate,
    updateCompanyAction
} from "../../../store/register-company/actions";
import {
    getReactRouterPathParamFromUrl,
    isNotBlank
} from "../../../services/utilities";
import {Redirect} from "react-router";
import {isAdminLogin} from "../../../services/auth/AuthNZ";
import Layout01 from "../../layout/Layout01/Layout01";
import SideLabelInputText from "../../common/SideLabelInputText/SideLabelInputText";
import {
    Button
} from '@material-ui/core';

class AuthCompany extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState(this.props.companyServiceResponse);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevAction = getReactRouterPathParamFromUrl(prevProps, "action");
        const currentAction = getReactRouterPathParamFromUrl(this.props, "action");
        if (currentAction === "create" && prevAction !== "create") {
            this.setState(this.createInitialState(this.props.companyServiceResponse));
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const action = getReactRouterPathParamFromUrl(this.props, "action");

        const saveCompany = {
            name: this.state.name,
            url: this.state.url,
            website: this.state.website,
            address: {
                street: this.state.addressStreet,
                city: this.state.addressCity,
                state: this.state.addressState,
                zip: this.state.addressZip
            }
        };

        if (action === "create") {
            let company = this.props.companyServiceResponse.target;
            saveCompany.id = company.id;
            saveCompany.active = false;
            this.props.createCompanyAction(saveCompany);
        } else {
            saveCompany.id = this.state.id;
            this.props.updateCompanyAction(saveCompany);
        }
    }

    createInitialState(companyServiceResponse) {
        const company = companyServiceResponse.target;
        if (company) {
            return {
                id: company.id,
                name: company.name,
                url: company.url,
                website: company.website,
                addressStreet: company.address.street,
                addressCity: company.address.city,
                addressState: company.address.state,
                addressZip: company.address.zip,
            }
        }
    }

    getRedirectUrl(props) {
        const action = getReactRouterPathParamFromUrl(this.props, "action");
        const actionViewOrEdit = action === MODE_VIEW || action === MODE_EDIT;
        const adminLogin = isAdminLogin(props.login);
        const isCompanySelected = props.companyServiceResponse && props.companyServiceResponse.target && props.companyServiceResponse.target.id;

        if (actionViewOrEdit && !adminLogin) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }

        if (actionViewOrEdit && adminLogin && !isCompanySelected) {
            return `${process.env.PUBLIC_URL}/404`;
        }
    }

    render() {
        const redirectUrl = this.getRedirectUrl(this.props);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }

        const action = getReactRouterPathParamFromUrl(this.props, "action");
        return (
            <Layout01>
                <div>
                    <h3>Company {action}</h3>
                    {this.registrationForm(action)}
                </div>
                <hr/>
                <NavLink to={`${process.env.PUBLIC_URL}/auth/company/view`}>
                    View Company
                </NavLink>
                <br/>
                <NavLink to={`${process.env.PUBLIC_URL}/auth/company/edit`}>
                    Edit Company
                </NavLink>
                <br/>
                <NavLink to={`${process.env.PUBLIC_URL}/auth/company/list`}>
                    Company List
                </NavLink>
            </Layout01>
        );
    }

    registrationForm(action) {
        const actionViewOrEdit = action === MODE_VIEW ? MODE_VIEW : MODE_EDIT;
        const fieldErrors = this.props.companyServiceResponse.fieldErrors;

        return (
            <div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/company_create_update.svg`}
                         alt="Company create update"/>
                </div>
                <form onSubmit={this.onSubmit}>
                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="Company Name"
                        name="name"
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["company.name"])}
                        help={fieldErrors["company.name"]}
                        value={this.state.name}/>

                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="URL"
                        name="url"
                        style={{marginBottom: "50px"}}
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["company.url"])}
                        help={<span>test<br/>test</span>}
                        value={this.state.url}/>

                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="Website"
                        name="website"
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["company.website"])}
                        help={fieldErrors["company.website"]}
                        value={this.state.website}/>

                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="Street"
                        name="addressStreet"
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["company.address.street"])}
                        help={fieldErrors["company.address.street"]}
                        value={this.state.addressStreet}/>

                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="City"
                        name="addressCity"
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["company.address.city"])}
                        help={fieldErrors["company.address.city"]}
                        value={this.state.addressCity}/>

                    <StateSelect
                        mode={actionViewOrEdit}
                        label="State"
                        selectedStateAbv={this.state.addressState}
                        name="addressState"
                        required={true}
                        error={isNotBlank(fieldErrors["company.address.state"])}
                        help={fieldErrors["company.address.state"]}
                        onChange={this.onChange}/>

                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="Zip"
                        name="addressZip"
                        onChange={this.onChange}
                        required={true}
                        error={isNotBlank(fieldErrors["company.address.zip"])}
                        help={fieldErrors["company.address.zip"]}
                        value={this.state.addressZip}/>

                    <div>
                        {action !== MODE_VIEW &&
                        /*
                        <button type="submit">
                            {action === "create" && "Next"}
                            {action === "edit" && "Update"}
                        </button>
                        */
                            <Button variant="outlined" color="primary" type="submit">
                                {action === "create" && "Next"}
                                {action === "edit" && "Update"}
                            </Button>
                        }
                    </div>
                </form>
            </div>
        );
    }
}

const actions = {createCompanyAction, updateCompanyAction, prepareCompanyToCreate};

const mapStateToProps = state => {
    return {
        companyServiceResponse: state.registerCompany.companyServiceResponse,
        login: state.login
    };
};

export default connect(mapStateToProps, actions)(AuthCompany);
