##Create React UI - ui commands
```bash
create-react-app ui
cd ui
yarn add axios
yarn add react-redux
yarn add history
yarn add react-router
yarn add react-router-dom
yarn add redux
yarn add redux-thunk
yarn add node-sass
yarn add bootstrap
```

## Configure react-app-rewired
Modify package.json and replace react-scripts with react-app-rewired

**package.json**
```
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-app-rewired eject"
  }
```

**config-overrides.js**
```ecmascript 6
const { injectBabelPlugin } = require("react-app-rewired");
const rewireMobX = require("react-app-rewire-mobx");

module.exports = function override(config, env) {
    config = injectBabelPlugin("babel-plugin-styled-components", config);
    config = rewireMobX(config, env);

    return config;
};
```

###Sending Request From Command Line
```
curl \
--header "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi51c2VyQGVtYWlsLmNvbSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJleHAiOjE1Mzg3MDUxMTd9.e89-FX8WI-2rPj6Q8dJxmngP6-aXxaGxPWtKk5wF2XewGKSRUePVeAhFhD_9iaQI9aIpjbz6crX_kideP6LM0Q" \
http://localhost:8085/company/secure
```

#To Add context path/Sub directory
## UI
### package.json
Add below in package.json if context path or sub dir is defined
```
"homepage": "/cdb",
```

### Router
```html
<Router history={history} basename={'/cdb'}>
```

### Views
Add **process.env.PUBLIC_URL** in all the image,
router, and link paths
```
<NavLink to={`${process.env.PUBLIC_URL}/company/add-user`}>
    Add user to company
</NavLink>
```
### .env - ui/environment/*.properties
Modify ui/environment/*.properties files to set
```
REACT_APP_API_BASE_PATH=http://localhost:8085
```
These properties files are used to create .env file
when starting or building react app.


## Services

### application.properties
```
server.servlet.context-path=/cdb
```

## SCP - Secure Copy

### Upload File or Folder
```
$ scp -i /Users/sheraz/.ssh/id_rsa \
    -r ./local-file-or-folder \
    ubuntu@54.165.184.232:/server-directory
```

### Download File or Folder
```
$ scp -i /Users/sheraz/.ssh/id_rsa \
    -r ubuntu@54.165.184.232:/server-directory \
    ./local-file-or-folder
```
===========================================




Testing after removing TabPrayer.state.prayerConfig
===================================================

✅ Edit -> Cancel
✅ Edit -> Switch Tab
✅ Edit -> Change Value -> Cancel
✅ Edit -> Switch Tab -> Cancel
✅ Edit -> Change Value -> Switch Tab -> Cancel

✅ Edit -> Save
✅ Edit -> Change Value -> Save
✅ Edit -> Switch Tab -> Save
✅ Edit -> Change Value -> Switch Tab -> Save

✅ Reset -> Cancel
✅ Reset -> Switch Tab
✅ Reset -> Change Value -> Cancel
✅ Reset -> Switch Tab -> Cancel
✅ Reset -> Change Value -> Switch Tab -> Cancel

✅ Reset -> Change Value -> Save
✅ Reset -> Switch Tab -> Save
✅ Reset -> Change Value -> Switch Tab -> Save





/**
 * Created this class for MongoDB aggregate.$lookup
 * https://docs.mongodb.com/manual/reference/operator/aggregation/lookup/
 * https://docs.spring.io/spring-data/mongodb/docs/current/api/org/springframework/data/mongodb/core/aggregation/LookupOperation.html
 *
 */


 /*
Java Implementation in CentralControlDaoImpl.findByCompanyUrl()
  MongoDB Javascript version of findByCompanyUrl()

  db.getCollection("centralControl")
    .aggregate([
        {
            $lookup: {
                from: "company",
                localField: "companyId",
                foreignField: "_id",
                as: "company"
            }
        },
        {
            $match: {
                "company.url": "c1"
            }
        }
    ]);
   */

=============================

### Todo


Service returns http://localhost:8085/api/auth/companies/url all active company names

On login page create companyId drop down. just like its is on Home page

Design Home page

Rebranding, icon, new website, 

Retest Create company UI

Update input field to make it material UI
Create a time input field
Create a date input field
Create Header, Footer

