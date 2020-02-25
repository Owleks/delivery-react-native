import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainNavigation from './MainNavigation';

export default createAppContainer(
  createSwitchNavigator({
    Main: MainNavigation,
  }),
);
