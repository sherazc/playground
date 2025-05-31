import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Provider} from "mobx-react";
import todoStore from './stores/TodoStore';
import userProfileStore from './stores/UserProfileStore';

const root = (
     <Provider todoStore={todoStore} userProfileStore={userProfileStore}>
        <App />
    </Provider>
);

ReactDOM.render(root, document.getElementById('root'));
registerServiceWorker();
