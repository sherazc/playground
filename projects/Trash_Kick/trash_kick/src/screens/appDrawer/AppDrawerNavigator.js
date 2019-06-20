import { createDrawerNavigator } from 'react-navigation';
import CustomerNavigator from '../customer/CustomerNavigator';
import AboutUs from './AboutUs';

export default createDrawerNavigator(
    {
        customer: {
            screen: CustomerNavigator
        },
        aboutUs: {
            screen: AboutUs
        }
    }, {
        initialRouteName: "customer"
    }
);