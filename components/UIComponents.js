import React from 'react'
import { View, Platform, StatusBar } from 'react-native'
import { Constants } from 'expo'
import { createBottomTabNavigator,createStackNavigator, createAppContainer } from 'react-navigation'
import AddCard from './AddCard'
import AddDeck from './AddDeck'
import Deck from './Deck'
import Decks from './Decks'
import Quiz from './Quiz'
import {purple, black, blue,white} from '../utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'



export function UdaciStatusBar({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height:Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export function UdaciAppContainer(){

  const TabNavigator = createBottomTabNavigator({
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
      }
    },
    AddDeck: {
      screen: AddDeck,
      navigationOptions: {
        tabBarLabel: 'Add new Deck',
        tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
      }
    }
  }, {
    navigationOptions: {
      header: null
    },
    tabBarOptions: {
      activeTintColor: Platform.OS === 'ios' ? black : white,
      style: {
        height: 60,
        backgroundColor: Platform.OS === 'ios' ? white : black,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  })

  const StackNavigator = createStackNavigator({
    Home:{
      screen: TabNavigator,
    },
    Deck:{
      screen : Deck,
      navigationOptions:{
        headerTintColor:white,
        headerStyle:{
          backgroundColor:blue
        }
      }
    },
    AddCard:{
      screen : AddCard,
      navigationOptions:{
        headerTintColor:white,
        headerStyle:{
          backgroundColor:blue
        }
      }
    },
    Quiz:{
      screen : Quiz,
      navigationOptions:{
        headerTintColor:white,
        headerStyle:{
          backgroundColor:blue
        }
      }
    }
  })

  const AppContainer = createAppContainer(StackNavigator);
  return (
    <AppContainer/>
  );
}
