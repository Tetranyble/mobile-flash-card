import React, {Component} from 'react';
import { Provider } from 'react-redux'
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import {UdaciStatusBar, UdaciAppContainer} from './UIComponents'
import {connect} from 'react-redux'
import {handleGetDecks} from '../actions/decks'

class Shell extends Component {

  componentDidMount()
  {
    const {dispatch} = this.props
    dispatch(handleGetDecks());
  }

  render() {
    const {initialized} = this.props;
    return (
      <View style={{flex:1}}>
        <UdaciStatusBar/>
        {initialized &&
          <UdaciAppContainer/>
        }
        {!initialized &&
          <ActivityIndicator/>
        }
      </View>
    )
  }
}

function mapStateToProps({initialized,loadingBar})
{
    return {
      initialized
    }
}

export default connect(mapStateToProps)(Shell)
