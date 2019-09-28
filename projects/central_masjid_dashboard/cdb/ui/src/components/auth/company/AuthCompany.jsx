import React, {Component} from "react";
import {connect} from "react-redux";
import StateSelect from "../../partials/StateSelect";
import InputField, {MODE_EDIT, MODE_VIEW} from "../../partials/InputField";
import {
    createCompanyAction,
    prepareCompanyToCreate,
    updateCompanyAction
} from "../../../store/register-company/actions";
import {NavLink} from "react-router-dom";
import {getReactRouterPathParamFromUrl} from "../../../services/utilities";
import {Redirect} from "react-router";
import {isAdminLogin} from "../../../services/auth/AuthNZ";

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
        const adminLogin = isAdminLogin(props);
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
            <div>
                <h3>Company {action}</h3>
                {this.registrationForm(action)}
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
            </div>
        );
    }

    registrationForm(action) {
        const fieldErrors = this.props.companyServiceResponse.fieldErrors;
        return (
            <div>
                <div>
                    <img src={`${process.env.PUBLIC_URL}/images/company_create_update.svg`}
                         alt="Company create update"/>
                </div>
                <form onSubmit={this.onSubmit}>
                    <InputField
                        mode={action}
                        label="Company Name"
                        name="name"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["company.name"]}
                        value={this.state.name}/>

                    <InputField
                        mode={action}
                        label="URL"
                        name="url"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["company.url"]}
                        value={this.state.url}/>

                    <InputField
                        mode={action}
                        label="Street"
                        name="addressStreet"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["company.address.street"]}
                        value={this.state.addressStreet}/>

                    <InputField
                        mode={action}
                        label="City"
                        name="addressCity"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["company.address.city"]}
                        value={this.state.addressCity}/>

                    <StateSelect
                        mode={action}
                        label="State"
                        selectedStateAbv={this.state.addressState}
                        name="addressState"
                        required={true}
                        fieldError={fieldErrors["company.address.state"]}
                        onChange={this.onChange}/>

                    <InputField
                        mode={action}
                        label="Zip"
                        name="addressZip"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["company.address.zip"]}
                        value={this.state.addressZip}/>

                    {action !== MODE_VIEW &&
                        <button type="submit">
                            {action === "create" && "Next"}
                            {action === "edit" && "Update"}
                        </button>
                    }
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
