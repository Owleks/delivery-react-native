import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainNavigation from './MainNavigation';
import AuthNavigation from "./AuthNavigation";

export default createAppContainer(
  createSwitchNavigator({
    Auth: AuthNavigation,
    Main: MainNavigation
  })
);
