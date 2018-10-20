import React, {Component} from "react";
import StateSelect from "./partials/StateSelect";
import InputField from "./partials/InputField";

class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            companyName: "Company Name",
            companyAddressStreet: "123 St",
            companyAddressCity: "City",
            companyAddressState: "GA",
            companyAddressZip: "12345",
            companyAddressLongitude: "1.1",
            companyAddressLatitude: "2.2",
            companyIcon: "icon",
            adminUserEmail: "email@email.com",
            adminUserPassword: "password123",
            adminUserFirstName: "First",
            adminUserLastName: "Last",
            adminUserRoles: ["ADMIN"]
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="row">

                <div className="col-sm-6">
                    <h3>Register</h3>
                    <form>
                        <InputField
                            label="Masjid Name"
                            name="companyName"
                            onChange={this.onChange}
                            value={this.state.companyName}/>

                        <InputField
                            label="Street"
                            name="companyAddressStreet"
                            onChange={this.onChange}
                            value={this.state.companyAddressStreet}/>

                        <InputField
                            label="City"
                            name="companyAddressCity"
                            onChange={this.onChange}
                            value={this.state.companyAddressCity}/>

                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <StateSelect selectedStateAbv={this.state.companyAddressState} name="companyAddressState"
                                         onChange={this.onChange}/>
                        </div>

                        <InputField
                            label="Zip"
                            name="companyAddressZip"
                            onChange={this.onChange}
                            value={this.state.companyAddressZip}/>
                        
                        <hr/>

                        <InputField
                            label="Email address"
                            name="adminUserEmail"
                            onChange={this.onChange}
                            value={this.state.adminUserEmail}
                            type="email"
                            help="We'll never share your email with anyone else."
                        />

                        <InputField
                            label="Password"
                            name="adminUserPassword"
                            type="password"
                            onChange={this.onChange}
                            value={this.state.adminUserPassword}/>

                        <InputField
                            label="First Name"
                            name="adminUserFirstName"
                            onChange={this.onChange}
                            value={this.state.adminUserFirstName}/>

                        <InputField
                            label="Last Name"
                            name="adminUserLastName"
                            onChange={this.onChange}
                            value={this.state.adminUserLastName}/>


                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

            </div>
        );
    }
}

/*
{
   "company":    {
      "name": "Company Name",
      "address":       {
         "street": "123 St",
         "city": "City",
         "state": "ST",
         "zip": "12345",
         "longitude": "1.1",
         "latitude": "2.2"
      },
      "icon": "icon"
   },
   "adminUser": {
      "email": "email@email.com",
      "password": "password123",
      "firstName": "First",
      "lastName": "Last",
      "roles": ["ADMIN"],
      "active": true,
      "verified": true
   }
}
 */
export default Register;
