import { StatusBar } from 'react-native';
import store from "./src/store/rootReducer";
import { Provider } from "react-redux";
import { NavRoutes } from './src/components/NavRoutes';
import { ConstantsStyles } from './src/services/Constants';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar barStyle="light-content" backgroundColor={ConstantsStyles.color.background2} />
      <NavRoutes />
    </Provider>
  );
}

