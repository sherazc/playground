import { createStackNavigator } from 'react-navigation';
import TrashPickup from "./TrashPickup"
import Booking from './Booking';
import Dashboard from './Dashboard';

const routes = {
    Dashboard: {
        screen: Dashboard,
    },
    TrashPickup: {
        screen: TrashPickup,
    },
    Details: {
        screen: Booking,
    },
};

const config ={
    initialRouteName: 'Dashboard'
}

export default createStackNavigator(routes, config);
