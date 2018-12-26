import React, {Component} from "react";
import {connect} from "react-redux";
import StateSelect from "../../partials/StateSelect";
import InputField from "../../partials/InputField";
import {prepareCompanyToCreate, saveCompanyAction} from "../../../store/register-company/actions";
import {NavLink} from "react-router-dom";
import {getPathParamFromProps} from "../../../services/utilities";
import {Redirect} from "react-router";
import {isAuthPresent, verifyAuthorization} from "../../../services/auth/AuthNZ";

class AuthCompany extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState(this.props.companyServiceResponse);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const prevAction = getPathParamFromProps(prevProps, "action");
        const currentAction = getPathParamFromProps(this.props, "action");
        if (currentAction === "create" && prevAction !== "create") {
            this.setState(this.createInitialState(this.props.companyServiceResponse));
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        let company = this.props.companyServiceResponse.target;
        const saveCompany = {
            id: company.id,
            name: this.state.name,
            address: {
                street: this.state.addressStreet,
                city: this.state.addressCity,
                state: this.state.addressState,
                zip: this.state.addressZip
            }
        };
        this.props.saveCompanyAction(saveCompany);
    }

    createInitialState(companyServiceResponse) {
        const company = companyServiceResponse.target;
        if (company) {
            return {
                id: company.id,
                name: company.name,
                addressStreet: company.address.street,
                addressCity: company.address.city,
                addressState: company.address.state,
                addressZip: company.address.zip,
            }
        }
    }

    getRedirectUrl(props) {
        const action = getPathParamFromProps(this.props, "action");
        const actionViewOrEdit = action === "view" || action === "edit";
        const isLoggedIn = isAuthPresent(props.login);
        const adminLogin = isLoggedIn && verifyAuthorization(this.props.login.tokenPayload, ['ADMIN']);
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

        const action = getPathParamFromProps(this.props, "action");
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
                        label="Masjid Name"
                        name="name"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["company.name"]}
                        value={this.state.name}/>

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

                    <button type="submit">Next</button>
                </form>
            </div>
        );
    }
}

const actions = {saveCompanyAction, prepareCompanyToCreate};

const mapStateToProps = state => {
    return {
        companyServiceResponse: state.registerCompany.companyServiceResponse,
        login: state.login
    };
};

export default connect(mapStateToProps, actions)(AuthCompany);
