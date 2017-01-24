import React from 'react';
import { AppRegistry } from 'react-native';

import ContainerView from './src/ContainerView.react';

function GroundhogView() {
  return (
    <ContainerView android />
  );
}

// App registration and rendering
AppRegistry.registerComponent('groundhog', () => GroundhogView);
