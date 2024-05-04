import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Eg01_SimpleReactForm } from './components/Eg01_SimpleReactForm';
import { Eg02 } from './components/Eg02';

function App() {

  const [egNumber, setEgNumber] = useState(1);

  return (
    <div>
      <ol>
        <li><a href="#" onClick={() => setEgNumber(1)}>Example01 Simple React Form</a></li>
        <li><a href="#" onClick={() => setEgNumber(2)}>Example02</a></li>
      </ol>
      <hr/>
      {egNumber === 1 && <Eg01_SimpleReactForm/>}
      {egNumber === 2 && <Eg02/>}
    </div>
  );
}

export default App;
