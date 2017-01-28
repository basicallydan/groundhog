import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';

import ContainerView from './src/ContainerView.react';
import { colors } from './src/styles';

function GroundhogView() {
  StatusBar.setBackgroundColor(colors.mainBackgroundColor);
  return (
    <ContainerView android />
  );
}

// App registration and rendering
AppRegistry.registerComponent('groundhog', () => GroundhogView);
