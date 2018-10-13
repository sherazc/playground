import {Provider} from "mobx-react";
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import AllStores from "./stores/AllStores";

import './index.css';

const root = (
    <Provider {...AllStores}>
        <App/>
    </Provider>
);

ReactDOM.render(
    root,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
