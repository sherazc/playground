import React, {Component} from "react";
import {connect} from "react-redux";
import StateSelect from "../partials/StateSelect";
import InputField from "../partials/InputField";
import {saveCompanyAction} from "../../store/register-company/actions";

class RegisterCompany extends Component {

    constructor(props) {
        super(props);
        this.state = this.createInitialState(this.props.companyServiceResponse);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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

    render() {
        return (
            <div>
                <h3>Register Company</h3>
                {this.registrationForm()}
            </div>
        );
    }

    registrationForm() {
        const fieldErrors = this.props.companyServiceResponse.fieldErrors;
        return (
            <div>
                <div>
                    <img src="images/company_create_update.svg" alt="Company create update"/>
                </div>
                <form onSubmit={this.onSubmit}>
                    <InputField
                        label="Masjid Name"
                        name="name"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["company.name"]}
                        value={this.state.name}/>

                    <InputField
                        label="Street"
                        name="addressStreet"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["company.address.street"]}
                        value={this.state.addressStreet}/>

                    <InputField
                        label="City"
                        name="addressCity"
                        onChange={this.onChange}
                        required={true}
                        fieldError={fieldErrors["company.address.city"]}
                        value={this.state.addressCity}/>

                    <StateSelect
                        label="State"
                        selectedStateAbv={this.state.addressState}
                        name="addressState"
                        required={true}
                        fieldError={fieldErrors["company.address.state"]}
                        onChange={this.onChange}/>

                    <InputField
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
const actions = {saveCompanyAction};

const mapStateToProps = state => {
    return {
        companyServiceResponse: state.registerCompany.companyServiceResponse
    };
};

export default connect(mapStateToProps, actions)(RegisterCompany);
