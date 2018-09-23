// use cdb;

// TODO Create authenticated mongodb connection
/*
db.createUser(
    {
        user: "cdbuser",
        pwd: "password123",
        roles: [
            { role: "readWrite", db: "cdb" }
        ]
    }
);
*/

db.getCollection('company').insert({
        "name": "Company Name",
        "address": {
            "street": "123 St",
            "city": "City",
            "state": "ST",
            "zip": "12345",
            "longitude": "1.1",
            "latitude": "2.2"
        },
        "icon": "icon"
    }
);
// https://www.dailycred.com/article/bcrypt-calculator
db.getCollection("user").insert(
    {
        "companyId": "xyz.abc",
        "email": "email@email.com",
        "password": "$2a$04$n.Ys16qnCE1ICxVkSM4ECeYXQOFwFUBGzfHUjECeZ6zniY69AzgKS", // password
        "firstName": "First",
        "lastName": "Last",
        "active": true,
        "roles": ["USER"]
    }
);
