/*
DO THIS
*/

export default class App extends React.Component {
    render() {
      return <AppContainer />;
    }
  }

  const AuthenticationNavigator = createStackNavigator({
    SignIn: SignInScreen,
    ForgotPassword: ForgotPasswordScreen,
  });

  const AppNavigator = createSwitchNavigator({
    /*
     * Rather than being rendered by a screen component, the
     * AuthenticationNavigator is a screen component
     */
    Auth: AuthenticationNavigator,
    Home: HomeScreen,
  });

  const AppContainer = createAppContainer(AppNavigator);