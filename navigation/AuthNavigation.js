import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import AuthScreen from '../screens/Auth'

const AppNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen,
  },
});

export default AppNavigator;