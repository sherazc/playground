import React, { useState } from 'react';
import './App.css';
import { Component01 } from './component/Component01';
import { Component02 } from './component/Component02';
import { Component03 } from './component/Component03';
import { Component04 } from './component/Component04';

function App() {
  const [page, setPage] = useState<string>("component01");

  return (
    <div className="App">
      <div>
        <button onClick={() => setPage("component01")}>Component01</button>
        <button onClick={() => setPage("component02")}>Component02</button>
        <button onClick={() => setPage("component03")}>Component03</button>
        <button onClick={() => setPage("component04")}>Component04</button>
      </div>
      <hr />
      <div>
        {page === "component01" && <Component01 />}
        {page === "component02" && <Component02 />}
        {page === "component03" && <Component03 />}
        {page === "component04" && <Component04 />}
      </div>
    </div>
  );
}

export default App;
