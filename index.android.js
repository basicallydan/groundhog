import React from 'react';
import { AppRegistry, StatusBar } from 'react-native';

import ContainerView from './src/ContainerView.react';

function GroundhogView() {
  StatusBar.setBackgroundColor('#303030');
  return (
    <ContainerView android />
  );
}

// App registration and rendering
AppRegistry.registerComponent('groundhog', () => GroundhogView);
