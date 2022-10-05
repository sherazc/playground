import { StatusBar } from 'expo-status-bar';
import store from "./src/store/rootReducer";
import { Provider } from "react-redux";
import { NavRoutes } from './src/components/NavRoutes';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style="auto" />
      <NavRoutes />
    </Provider>
  );
}

