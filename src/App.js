import React from 'react';

import Router from './router';
import {Provider} from 'react-redux';
import storeState from './redux/store';
export default function App() {
  return (
    <Provider store={storeState}>
      <Router />
    </Provider>
  );
}
