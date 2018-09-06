import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterStore from './stores/CounterStore';
import {Provider} from "mobx-react";

const providerComponent = (
    <Provider counterStore={counterStore}>
        <App />
    </Provider>
);

ReactDOM.render(providerComponent, document.getElementById('root'));
registerServiceWorker();
