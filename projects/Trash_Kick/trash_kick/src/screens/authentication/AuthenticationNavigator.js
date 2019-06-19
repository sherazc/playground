import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import ForgotPassword from './ForgotPassword';

const routes = {
    Login: {
        screen: Login
    },
    ForgotPassword: {
        screen: ForgotPassword
    },
};

const navigatorNavigationOptions = {
    initialRouteName: 'Login',
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
}

export default createStackNavigator(routes, navigatorNavigationOptions);
