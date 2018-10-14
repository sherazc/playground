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
            <div>
                <h3>Register</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1"
                               aria-describedby="emailHelp" placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with
                            anyone else.
                        </small>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
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
