import React, {Component} from 'react';
import firebase from 'firebase';
import { Provider } from 'react-redux';
import store from './src/reducers';
import RootContainer from './src/RootContainer';
import ignoreWarnings from 'react-native-ignore-warnings';

const firebaseConfig = {
  apiKey: "AIzaSyDvnKIOG40-Fhbpr_6I4oeYKt2J6F-oqJU",
  authDomain: "lap2-270b6.firebaseapp.com",
  databaseURL: "https://lap2-270b6.firebaseio.com",
  projectId: "lap2-270b6",
  storageBucket: "lap2-270b6.appspot.com",
  messagingSenderId: "934866289582"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : null;

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
