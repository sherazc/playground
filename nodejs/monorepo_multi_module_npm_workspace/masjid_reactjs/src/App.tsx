import React from 'react';
import logo from './logo.svg';
import './App.css';
import {add, getAllMasjid, Masjid} from "masjid_lib";

function App() {
  const masjid: Masjid = {name: "Masjid A", address: "Address A"};
  const masjids:Array<Masjid> = getAllMasjid();
  const result = add(3, 4);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
          <br/>
          {masjid.name}
          <br/>
          {masjids[0].name}
          <br/>
          {result}
        </a>
      </header>
    </div>
  );
}

export default App;
