import React from 'react';
import {StatusBar} from 'react-native';

const Statusbar = ({color}) => {
  return <StatusBar barStyle="dark-content" backgroundColor={color} />;
};
export default Statusbar;
