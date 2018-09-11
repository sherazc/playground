import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "mobx-react";
import registerServiceWorker from './registerServiceWorker';

const root = (
    <Provider>
       <App />
   </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
