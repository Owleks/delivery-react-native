import React from 'react';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import MenusScreen from '../screens/Menus';
import ConcreteMenuScreen from '../screens/ConcreteMenu';
import MyOrderScreen from '../screens/MyOrder';
import Cart from '../components/Cart';

const MainNavigator = createStackNavigator({
  Menus: {
    screen: MenusScreen,
  },
  ConcreteMenu: {
    screen: ConcreteMenuScreen
  },
  MyOrder: {
    screen: MyOrderScreen,
    navigationOptions: {
      headerRight: () => null,
    }
  },
}, {
  defaultNavigationOptions: ({navigation})=>({
    headerRight: () => (
      <Cart navigation={navigation}/>
    ),
  })});

export default (MainNavigator);