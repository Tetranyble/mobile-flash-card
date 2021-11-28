import React, {Component} from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import { StyleSheet, Text, View } from 'react-native';
import Shell from './components/Shell'
import 'react-native-gesture-handler'
import {setLocalNotification} from './utils/notification'

class App extends Component {
  componentDidMount()
  {
    setLocalNotification();
  }

  render() {
    return (
      <Provider store={createStore(reducer,middleware)}>
        <Shell/>
      </Provider>
    )
  }
}

export default App
