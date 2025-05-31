import React from 'react';
import {Provider} from "react-redux";
import store from "./store/rootReducer";
import Name from './components/Name';
import Counter from './components/Counter';

function App() {
  return (
    <Provider store={store}>
      <div>
        <Name/>
        <hr/>
        <Counter/>
      </div>
    </Provider>
  );
}

export default App;
