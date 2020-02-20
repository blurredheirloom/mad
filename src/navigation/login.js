/* Login Navigation */

import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';
import LostPassScreen from '../screens/auth/lostPass';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';

const LoginNavigation = createBottomTabNavigator(
  {
    Login: { screen: LoginScreen, navigationOptions: { tabBarVisible: false }},
    Register: { screen: RegisterScreen, navigationOptions: { tabBarVisible: false } },
    LostPass: { screen: LostPassScreen, navigationOptions: { tabBarVisible: false } }
  },
  {
    navigationOptions: { swipeEnabled: false },
    initialRouteName: 'Login',
  }
);

export default createAppContainer(LoginNavigation)
