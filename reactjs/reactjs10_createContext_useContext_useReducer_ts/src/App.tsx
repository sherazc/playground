import React from 'react';
import { Home } from './Home';
import { AppProvider } from './store/contextStore';

const App: React.FC = (): React.JSX.Element => {
  return (
    <AppProvider>
      <Home/>
    </AppProvider>
  );
}

export default App;
