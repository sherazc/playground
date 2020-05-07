import React, {useState} from 'react';
import './App.css';
import Eg00Counter from './components/Eg00_useState/Eg00Counter';
import Eg01Counter from './components/Eg01_useEffect_runs_after_every_re-render/Eg01Counter';
import Eg02Counter from './components/Eg02_useEffect_runs_after_every_re-render_and_cleanup/Eg02Counter';


function App() {
  const [egNum, setEgNum] = useState(0);

  const examples = [
    {name: "useState", component: <Eg00Counter/>},
    {name: "useEffect - Runs after every re-render", component: <Eg01Counter/>},
    {name: "useEffect - Runs after every re-render and cleanup", component: <Eg02Counter/>},

  ];

  return (
    <div style={{backgroundColor: "gray", padding: "20px"}}>
      <label htmlFor="examples">Examples: </label>
      <select id="examples" onChange={(e) => setEgNum(e.target.value)}>
        {examples.map((example, i) => <option key={i} value={i}>{i} {example.name}</option>)}
      </select>

      <div style={{backgroundColor: "white",
          border: "1px solid black", padding: "20px",
          marginTop: "20px"}}>
      {examples[egNum].component}
      </div>
    </div>
  );
}

export default App;
