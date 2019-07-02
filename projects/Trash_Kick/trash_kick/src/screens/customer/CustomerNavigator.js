import { createStackNavigator } from 'react-navigation';
import TrashPickup from "./TrashPickup"
import Booking from './Booking';
import Dashboard from './Dashboard';
import Messages from './Messages';
import MyProfile from './MyProfile';
import TrashPickup2 from './TrashPickup2';

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
    TrashPickup2: {
        screen: TrashPickup2,
    },
    Booking: {
        screen: Booking,
    },
    Messages: {
        screen: Messages,
    },
    MyProfile: {
        screen: MyProfile,
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
