import React, {Component} from "react";
import {connect} from "react-redux";
import StateSelect from "../partials/StateSelect";
import InputField from "../partials/InputField";
import {saveCompanyAction} from "../../store/register-company/actions";

class RegisterCompany extends Component {

    constructor(props) {
        super(props);
        this.state = this.createFlatCompany(this.props.companyServiceResponse);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    onSubmit(event) {
        event.preventDefault();
        const saveCompany = {
            id: this.state.id,
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

    createFlatCompany(companyServiceResponse) {
        if (companyServiceResponse.target) {
            const company = companyServiceResponse.target;
            return {
                id: company.id,
                name: company.name,
                addressStreet: company.address.street,
                addressCity: company.address.city,
                addressState: company.address.state,
                addressZip: company.address.zip,
            }
        } else {
            return {
                id: "",
                name: "",
                addressStreet: "",
                addressCity: "",
                addressState: "",
                addressZip: "",
            }
        }
    }

    render() {
        return (
            <div>
                <h3>Register Masjid</h3>
                {this.registrationForm()}
            </div>
        );
    }

    registrationForm() {
        const company = this.props.companyServiceResponse.target;
        let companyId = "";
        if (company && company.id) {
            companyId = this.props.companyServiceResponse.target.id;
        }

        return (
            <div>
                <div>
                    <img src="images/company_create_update.svg" alt="Company create update"/>
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        {/*<input name="id" value={this.props.companyServiceResponse.target.id}/>*/}
                        <input name="id" value={companyId} readOnly/>
                        <InputField
                            label="Masjid Name"
                            name="name"
                            onChange={this.onChange}
                            required={true}
                            value={this.state.name}/>

                        <InputField
                            label="Street"
                            name="addressStreet"
                            onChange={this.onChange}
                            required={true}
                            value={this.state.addressStreet}/>

                        <InputField
                            label="City"
                            name="addressCity"
                            onChange={this.onChange}
                            required={true}
                            value={this.state.addressCity}/>

                        <StateSelect
                            label="State"
                            selectedStateAbv={this.state.addressState}
                            name="addressState"
                            required={true}
                            onChange={this.onChange}/>

                        <InputField
                            label="Zip"
                            name="addressZip"
                            onChange={this.onChange}
                            required={true}
                            value={this.state.addressZip}/>

                        <button type="submit">Next</button>
                    </form>
                </div>
            </div>
        );
    }
}


const actions = {
    saveCompanyAction: saveCompanyAction
};


const mapStateToProps = state => {
    return {
        companyServiceResponse: state.registerCompany.companyServiceResponse
    };
};

export default connect(mapStateToProps, actions)(RegisterCompany);

