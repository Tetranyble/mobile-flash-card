import React, {Component} from 'react'
import {Text, TextInput, View, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { white, red, green, gray, orange, blue, black } from '../utils/colors'
import { handleCreateDeck } from '../actions/decks'
import { NavigationActions } from 'react-navigation'

class AddDeck extends Component{
  state={
    input : '',
    feedback : '',
    feedbackColor : gray,
    disabled : true
  }

  handleChange = (input)=>{
    const {deckTitles} = this.props;
    if(input === '')
    {
      this.setState(()=>({
        input,
        feedback : 'INFO : Please add a valid title',
        feedbackColor : gray,
        disabled : true
      }))
      return
    }

    if(input !== '' && deckTitles.indexOf(input) > -1)
    {
      this.setState(()=>({
        input,
        feedback : 'ERROR : A deck with this title already exists',
        feedbackColor : red,
        disabled : true
      }))
      return
    }

    this.setState(()=>({
      input,
      feedback : 'O.K. : Title is valid',
      feedbackColor : green,
      disabled : false
    }))
  }

  submitNewDeck = () =>{
    const deckTitle = this.state.input;
    const {dispatch, navigation} = this.props;
    this.setState(()=>({
      input : '',
      feedback : '',
      feedbackColor : gray,
      disabled : true
    }))
    //alert('AddDeck submitNewDeck> '+deckTitle)
    dispatch(handleCreateDeck(deckTitle));
    navigation.navigate('Deck',{entryId:deckTitle})
  }

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back()
    )
  }

  render(){
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>
          Add a new Deck
        </Text>
        <TextInput
          value={this.state.input}
          style={styles.input}
          onChangeText={this.handleChange}
        />
      <Text style={{color:this.state.feedbackColor}}>
        {this.state.feedback}
      </Text>
      <TouchableOpacity
        disabled={this.state.disabled}
        activeOpacity = { .5 }
        onPress={this.submitNewDeck}>
        <View style={this.state.disabled ? styles.btnDisabled : styles.btnEnabled}>
          <Text>
            Create Deck
          </Text>
        </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  title:{
    fontSize:30,
    paddingTop:10,
    paddingBottom:10
  },

  container:{
    flex:1,
    alignItems:'center',
    backgroundColor: white,
    padding: 20,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 17,
   },

   input:{
     width: 200,
     height: 44,
     padding: 10,
     borderWidth: 1,
     borderColor: blue,
     margin:10,
   },

   btnDisabled:{
     margin:10,
     padding : 60,
     paddingTop : 20,
     paddingBottom : 20,
     backgroundColor: white,
     borderColor : orange,
     borderWidth: 2,
     opacity:.3,
     borderRadius: Platform.OS === 'ios' ? 10 : 2
   },

   btnEnabled:{
     margin:10,
     padding : 60,
     paddingTop : 20,
     paddingBottom : 20,
     backgroundColor: white,
     borderColor : orange,
     borderWidth: 2,
     opacity:1,
     borderRadius: Platform.OS === 'ios' ? 10 : 2
   },
})

function mapStateToProps({decks})
{
  const deckTitles = Object.keys(decks);
    return {
      deckTitles
    }
}

export default connect(mapStateToProps)(AddDeck)
