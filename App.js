import React from 'react';
import MainNavigator from './src/MainNavigator/MainNavigator';
import {store} from './src/Redux/Store';
import {Provider} from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
}
