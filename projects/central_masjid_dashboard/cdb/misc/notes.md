###Sending Request From Command Line

```
curl \
--header "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi51c2VyQGVtYWlsLmNvbSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJleHAiOjE1Mzg3MDUxMTd9.e89-FX8WI-2rPj6Q8dJxmngP6-aXxaGxPWtKk5wF2XewGKSRUePVeAhFhD_9iaQI9aIpjbz6crX_kideP6LM0Q" \
http://localhost:8085/company/secure
```

##Create React UI - cdb-ui commands
Used the commands below to create the app
```
$ create-react-app cdb-ui --scripts-version=react-scripts-ts
$ cd cdb-ui 
$ npm install --save react-router-dom
$ npm install --save mobx-react

```


# Yarn Test Fails
create-react-app cdb-ui --scripts-version=react-scripts-ts
cd cdb-ui 
yarn add @types/react-router-dom react-router-dom mobx mobx-react
yarn test


create-react-app cdb-ui --scripts-version=react-scripts-ts
cd cdb-ui 
npm install --save @types/react-router-dom react-router-dom mobx mobx-react
rm -rf yarn.lock
rm -rf package-lock.json
rm -rf node_modules
yarn install
npm install
yarn test

yarn start



# Create React UI app 
```bash
create-react-app ui
cd ui
yarn add --save react-router-dom 
yarn add --save mobx 
yarn add --save mobx-react
yarn add --save react-app-rewired 
yarn add --save react-app-rewire-mobx 
yarn add --save babel-plugin-styled-components
yarn test
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

