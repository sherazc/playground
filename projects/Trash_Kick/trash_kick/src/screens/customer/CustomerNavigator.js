import { createStackNavigator } from 'react-navigation';
import TrashPickup from "./TrashPickup"
import Booking from './Booking';
import Dashboard from './Dashboard';

const routes = {
    Dashboard: {
        screen: Dashboard,
        navigationOptions: {
            header: null
        }
    },
    TrashPickup: {
        screen: TrashPickup,
    },
    Details: {
        screen: Booking,
    },
};

const navigatorNavigationOptions = {
    initialRouteName: 'Dashboard',
    // headerMode: 'none', // Removes header from all screens
    navigationOptions: {
        // Removes navigation buttons like back button on header
        headerVisible: false,
    }
}

export default createStackNavigator(routes, navigatorNavigationOptions);
