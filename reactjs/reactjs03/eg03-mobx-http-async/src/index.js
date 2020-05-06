import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "mobx-react";
import registerServiceWorker from './registerServiceWorker';
import AllStores from "./stores/AllStores";

console.log();

const root = (
    <Provider {...AllStores}>
       <App />
   </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
