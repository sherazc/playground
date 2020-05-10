import React, {useState} from 'react';
import './App.css';
import Eg00Counter from './components/Eg00_useState/Eg00Counter';
import Eg01Counter from './components/Eg01_useEffect_runs_after_every_re-render/Eg01Counter';
import Eg02Counter from './components/Eg02_useEffect_runs_after_every_re-render_and_cleanup/Eg02Counter';
import Eg03Counter from './components/Eg03_useEffect_run_after_a_state_variable_is_updated/Eg03Counter';
import Eg04Counter from './components/Eg04_useEffect_run_only_once_like_componentDidMount/Eg04Counter';
import Eg05Counter from './components/Eg05_useState_lazyInitialization/Eg05Counter';
import Eg06Counter from './components/Eg06_customHook/Eg06Counter';
import Eg07Counter from './components/Eg07_customHook_localStorage/Eg07Counter';
import Eg08ThemeContext from './components/Eg08_useContext/Eg08ThemeContext';
import Eg09Counter from './components/Eg09_useContext_state_in_context/Eg09Counter';
import Eg10Counter from './components/Eg10_useReducer/Eg10Counter';
import Eg11UseReducerUseContext from './components/Eg11_useReducer_and_useContext_globalState/Eg11UseReducerUseContext';


function App() {
  const [egNum, setEgNum] = useState(0);

  const examples = [
    {name: "useState", component: <Eg00Counter/>},
    {name: "useEffect - Runs after every re-render", component: <Eg01Counter/>},
    {name: "useEffect - Runs after every re-render and cleanup", component: <Eg02Counter/>},
    {name: "useEffect - Run after a state variable is updated", component: <Eg03Counter/>},
    {name: "useEffect - Run only once like componentDidMount()", component: <Eg04Counter/>},
    {name: "useState - Lazy Initialization", component: <Eg05Counter/>},
    {name: "customHook", component: <Eg06Counter/>},
    {name: "customHook - Local Storage", component: <Eg07Counter/>},
    {name: "useContext", component: <Eg08ThemeContext/>},
    {name: "useContext - State_in_context", component: <Eg09Counter/>},
    {name: "useReducer", component: <Eg10Counter/>},
    {name: "useReducer & useContext - Global state like redux", component: <Eg11UseReducerUseContext/>},
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
