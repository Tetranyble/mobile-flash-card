import React, {Component} from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Platform, Alert } from "react-native";
import { connect } from 'react-redux'
import { handleRemoveDeck } from '../actions/decks'
import { white, blue } from '../utils/colors'
import DeckItemRenderer from './DeckItemRenderer'

class Decks extends Component{

  render() {
    const {decks,dispatch,hasDecks} = this.props;
      return (
        <View style={{flex:1}}>
          {hasDecks === true &&
          <FlatList
            data={Object.values(decks)}
            renderItem={({item}) => (
                <DeckItemRenderer
                  item = {item}
                  handleDetail={()=>this.props.navigation.navigate(
                    'Deck',
                    {entryId : item.title}
                  )}
                  handleDelete={()=>{
                    Alert.alert(
                      'Delete Deck',
                      `Do you really want to delete the deck "${item.title}" including all of it's cards ?`,
                      [
                        {text: 'No',style: 'cancel'},
                        {text: 'Yes', onPress: () => dispatch(handleRemoveDeck(item.title))},
                      ],
                      {cancelable: false},
                    );
                  }}
                />
            )}
            keyExtractor={(item, index) => item.title}
          />}
          {hasDecks === false &&
            <View style={styles.messageContainer}>
              <Text style={styles.messageHeader}>
                👋 You did not create any decks yet
              </Text>
              <Text style={styles.messageContext}>
                Use the Tab "Add new Deck" to add your first deck.
              </Text>
            </View>
          }
        </View>
      )
    }
}

const styles = StyleSheet.create({
  messageContainer:{
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    borderColor: blue,
    borderWidth:2,
    padding: 10,
    margin:10,
  },
  messageHeader:{
    fontSize:20,
    paddingTop:10,
    paddingBottom:20,
    textAlign:'center'
  },

  messageContext:{
    fontSize:14,
    paddingBottom:0,
    textAlign:'center'
  }
})

function mapStateToProps({decks,initialized,loadingBar})
{
    return {
      decks,
      initialized,
      hasDecks:Object.keys(decks).length > 0 ? true : false
    }
}

export default connect(mapStateToProps)(Decks)
