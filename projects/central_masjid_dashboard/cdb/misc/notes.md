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

-----------------------------------
###Test Cases:



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

Register -> Home Page -> Dashboard

Verify what happens when default entities are missing for existing companies

Retest Create company UI and login

-----------------------------------
####Defects

Defect:
Register company
Login
Goto admin prayer tab. 
Error in browser console

✅ Defect:
Register company
nav to dashboard
there is no clock

✅ Defect: 
On logout redux.centralControl is not getting cleaned up

Defect:
Register company
Login
On configuration tab click ➕ on Jummahs or Expenses
No Row is added
Click ➕ again row is added.

Defect:
TabConfiguraton's save complete action is not disabling save cancel buttons

-----------------------------------
###Requirements

✅ show admin configuration description

✅ make clock zero remove clock from dashboard

✅ HOD is not working after ObjectId change

✅ Convert all IDS fields to objectID

✅ Register new company and its central-control endpoint is giving 404 
GET http://localhost:8085/api/companies/url/c3/central-control

✅ when new company is saved whey its inactive

✅ Register company and load it dashboar

✅ On register make couple of default funds

✅ Admin and service enable disable funds 

✅ Admin and service enable disable expenses

✅ Remove disabled funds from dashboard

✅ Remove disabled expenses from dashboard

✅ homepage dropdown not loading all the URLs

✅ On login page create companyId drop down. just like its is on Home page

✅ make login form on home page

✅ Service returns http://localhost:8085/api/auth/companies/url all active company names

✅ Pass company urls in Login component from home component and load company select box from the props

Create data version mongo document

Any change to PrayerConfig, or Central control will up version number

Make single function in CompanyDashboard that will make all the API calls. 
This function will call APIs and update CompanyDashboard.state. 
This function will be called on initial CompanyDashboard load and on refresh events. 

CompanyDashboard will poll for version. If new version is available then data will be refreshed.  
 

Remove all references to /login nav link

create a Jummah Khateeb slide

On Register company create

    * centralControl
    * PrayerConfig
    
Show error message on login failed

Load defaults prayerConfig if company exists
http://localhost:8085/api/prayer/config/5d9fb64ff2a23366c8c856f4

Prayer time batch update

Update input field to make it material UI

    * Create a time input field
    * Create a date input field


Design Web DB utility to store in browser local storage. And retrieve and search 

Store in browser cache previously selected dashboard


###UI Design requirements

Do some research on web for good Header, Footer designs

Home page

make dashboard select and login component  side by side

Header and footer

Rebranding, icon, new website,

Create material UI fields
 
    * input
    * date
    * time


### Maintenance requirements

Register new Domain and AWS

background Maintenance service
    delete logs
    delete unused companies and its data
    delete unused users and their data

-----------------------------------
###Tech Debt

improve logging in services

improve test coverage

Redesign/Refactor PrayerConfigServiceImpl.getPrayerConfig()

Refactor Make PrayerConfigServiceImpl smaller. It becoming very large.
