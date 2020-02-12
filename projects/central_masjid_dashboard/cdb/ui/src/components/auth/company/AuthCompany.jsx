import React, {Component} from "react";
import {connect} from "react-redux";
import StateSelect from "../../partials/StateSelect";
import {MODE_CREATE, MODE_EDIT, MODE_VIEW} from "../../partials/InputField";
import {NavLink} from "react-router-dom";
import {
    createCompanyAction,
    prepareCompanyToCreate,
    updateCompanyAction
} from "../../../store/register-company/actions";
import {
    equalObjects,
    getReactRouterPathParamFromUrl,
    isNotBlank,
    replaceNonAlphaNumeric,
    replaceNonNameCharacters,
    trimToLength
} from "../../../services/utilities";
import {Redirect} from "react-router";
import {
    isAdminLogin,
    isAuthPresent,
    isSuperAdminLogin,
    loadCompanyFromProps
} from "../../../services/auth/AuthNZ";
import Layout01 from "../../layout/Layout01/Layout01";
import SideLabelInputText from "../../common/SideLabelInputText/SideLabelInputText";
import {
    Button
} from '@material-ui/core';

const URL_HELP_MESSAGE = "Use this link to access dashboard.";

class AuthCompany extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState(loadCompanyFromProps(props));
        this.onChange = this.onChange.bind(this);
        this.onChangeAlphaNumeric = this.onChangeAlphaNumeric.bind(this);
        this.onChangeNameCharacters = this.onChangeNameCharacters.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // const prevAction = getReactRouterPathParamFromUrl(prevProps, "action");
        // const currentAction = getReactRouterPathParamFromUrl(this.props, "action");
        const companyPrevious = loadCompanyFromProps(prevProps);
        const company = loadCompanyFromProps(this.props);


        if (company && !equalObjects(companyPrevious, company)) {
            console.log("Updating state company", company);
            this.setState(this.createInitialState(company));
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: trimToLength(event.target.value, 100)});
    }


    onChangeAlphaNumeric(event) {
        this.setState({[event.target.name]: replaceNonAlphaNumeric(event.target.value, 50)});
    }


    onChangeNameCharacters(event) {
        this.setState({[event.target.name]: replaceNonNameCharacters(event.target.value, 50)});
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
            const company = loadCompanyFromProps(this.props);
            saveCompany.id = company.id;
            saveCompany.active = company.active;
            saveCompany.expirationDate = company.expirationDate;
            this.props.updateCompanyAction(saveCompany);
        }
    }

    createInitialState(company) {
        if (company) {
            return {
                id: company.id,
                name: company.name,
                url: company.url,
                website: company.website,
                addressStreet: company.address.street,
                addressCity: company.address.city,
                addressState: company.address.state,
                addressZip: company.address.zip
            }
        } else {
            return {
                id: "",
                name: "",
                url: "",
                website: "",
                addressStreet: "",
                addressCity: "",
                addressState: "",
                addressZip: ""
            }
        }
    }

    createUrlHelp() {
        return (
            <>
                <span style={{color: "#cc8434"}}>
                    {window.location.origin}/{this.state.url}
                </span>
                <br/>
                {URL_HELP_MESSAGE}
            </>
        );
    }

    getRedirectUrl(props) {
        const action = getReactRouterPathParamFromUrl(this.props, "action");
        // const actionViewOrEdit = action === MODE_VIEW || action === MODE_EDIT;
        const actionCreate = action === MODE_CREATE;

        if (actionCreate) {
            return;
        }

        const adminLogin = isAdminLogin(props.login);
        const superAdminLogin = isSuperAdminLogin(props.login);

        // Company is selected on super admin logged in and updating another company
        const companySelected = props.companyServiceResponse
            && props.companyServiceResponse.target
            && isNotBlank(props.companyServiceResponse.target.id);

        console.log((adminLogin || superAdminLogin));
        if (!(adminLogin || superAdminLogin) && companySelected) {
            return `${process.env.PUBLIC_URL}/forbidden`;
        }

        const isLogin = isAuthPresent(props.login);
        const companyLogin = props.login.company && props.login.company.id;


        if (isLogin && companyLogin) {
            return;
        }

        return `${process.env.PUBLIC_URL}/forbidden`;
    }


    registrationForm(action) {
        const actionViewOrEdit = action === MODE_VIEW ? MODE_VIEW : MODE_EDIT;
        const fieldErrors = this.props.companyServiceResponse.fieldErrors;

        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="Masjid Name"
                        name="name"
                        onChange={this.onChangeNameCharacters}
                        required={true}
                        error={isNotBlank(fieldErrors["company.name"])}
                        help={fieldErrors["company.name"]}
                        value={this.state.name}/>

                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="Dashboard URL"
                        name="url"
                        style={{marginBottom: "50px"}}
                        onChange={this.onChangeAlphaNumeric}
                        required={true}
                        error={isNotBlank(fieldErrors["company.url"])}
                        help={this.createUrlHelp()}
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
                        onChange={this.onChangeNameCharacters}
                        required={true}
                        error={isNotBlank(fieldErrors["company.address.street"])}
                        help={fieldErrors["company.address.street"]}
                        value={this.state.addressStreet}/>

                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="City"
                        name="addressCity"
                        onChange={this.onChangeNameCharacters}
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
                        onChange={this.onChangeNameCharacters}/>

                    <SideLabelInputText
                        mode={actionViewOrEdit}
                        label="Zip"
                        name="addressZip"
                        onChange={this.onChangeNameCharacters}
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

    actionToHeading(action) {
        let result = '';
        if (!action || MODE_CREATE === action) {
            result = "Register Masjid";
        } else if (MODE_EDIT === action) {
            result = "Edit Masjid Profile";
        } else if (MODE_VIEW === action) {
            result = "Masjid Profile";
        }
        return result;
    }

    createNavLinks(props) {
        const isLogin = isAuthPresent(props.login);
        const action = getReactRouterPathParamFromUrl(this.props, "action");
        if (!isLogin) {
            return;
        }
        return (<>
            {MODE_EDIT !== action && (<>
                <NavLink to={`${process.env.PUBLIC_URL}/auth/company/edit`}>
                    Edit Company
                </NavLink>
                <span style={{margin: "10px"}}>|</span>
            </>)}
            <NavLink to={`${process.env.PUBLIC_URL}/auth/company/user/create`}>
                Add user to company
            </NavLink>
        </>);
    }


    render() {
        const redirectUrl = this.getRedirectUrl(this.props);
        if (redirectUrl) {
            return <Redirect to={redirectUrl}/>;
        }


        const action = getReactRouterPathParamFromUrl(this.props, "action");
        const headingText = this.actionToHeading(action);
        return (
            <Layout01>
                <div>
                    <h1>{headingText}</h1>
                    {this.createNavLinks(this.props)}
                    {this.registrationForm(action)}
                </div>
            </Layout01>
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
