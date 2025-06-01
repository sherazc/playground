import React from 'react';
import { Home } from './Home';
import { CountContextProvider } from './hook/CountContext';

const App: React.FC = (): React.JSX.Element => {
  return (
    <CountContextProvider>
      <Home/>
    </CountContextProvider>
  );
}

export default App;
