import React, {Component} from "react";

class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            company: {
                name: "Company Name",
                address: {
                    street: "123 St",
                    city: "City",
                    state: "ST",
                    zip: "12345",
                    longitude: "1.1",
                    latitude: "2.2"
                },
                icon: "icon"
            },
            adminUser: {
                email: "email@email.com",
                password: "password123",
                firstName: "First",
                lastName: "Last",
                roles: ["ADMIN"],
                active: true,
                verified: true
            }
        }
    }

    render() {
        return (
            <div className="row">

                <div className="col-sm-6">
                    <h3>Register</h3>
                    <form>


                        <div className="form-group">
                            <label htmlFor="companyName">Masjid Name</label>
                            <input type="text" className="form-control" name="companyName" id="companyName"
                                   placeholder="Masjid Name"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="street">Street</label>
                            <input type="text" className="form-control" name="street" id="street"
                                   placeholder="Street"/>
                        </div>


                        <div className="form-group">
                            <label htmlFor="city">City</label>
                            <input type="text" className="form-control" name="city" id="city"
                                   placeholder="City"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="state">State</label>
                            <input type="text" className="form-control" name="state" id="state"
                                   placeholder="State"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="zip">Zip</label>
                            <input type="text" className="form-control" name="zip" id="zip"
                                   placeholder="Zip"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="icon">Icon</label>
                            <input type="text" className="form-control" name="icon" id="icon"
                                   placeholder="Icon"/>
                        </div>

                        <hr/>

                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1"
                                   aria-describedby="emailHelp" placeholder="Enter email"/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                                anyone else.
                            </small>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" id="password"
                                   placeholder="Password"/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input type="text" className="form-control" name="firstName" id="firstName"
                                   placeholder="First Name"/>
                        </div>



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
