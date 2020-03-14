import React, {Component} from 'react';
import { Provider } from 'react-redux';
import store from './src/reducers';
import RootContainer from './src/RootContainer';
import ignoreWarnings from 'react-native-ignore-warnings';

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    )
  }
}

ignoreWarnings('Setting a timer');

export default App;
