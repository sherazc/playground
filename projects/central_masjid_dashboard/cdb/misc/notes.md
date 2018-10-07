###Sending Request From Command Line

```
curl \
--header "Authorization: Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbi51c2VyQGVtYWlsLmNvbSIsInJvbGVzIjpbIkFETUlOIiwiVVNFUiJdLCJleHAiOjE1Mzg3MDUxMTd9.e89-FX8WI-2rPj6Q8dJxmngP6-aXxaGxPWtKk5wF2XewGKSRUePVeAhFhD_9iaQI9aIpjbz6crX_kideP6LM0Q" \
http://localhost:8085/company/secure
```

###Create React UI - cdb-ui commands
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



# Fully Successful
create-react-app ui
cd ui
npm install --save react-router-dom mobx mobx-react react-app-rewired react-app-rewire-mobx
yarn test

