import React, {Component} from 'react'
import {Text, TextInput, View, KeyboardAvoidingView, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { white, red, green, gray, orange, blue, black } from '../utils/colors'
import { handleAddCard } from '../actions/decks'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component{
  state={
    question : '',
    answer : ''
  }

  handleChangeQuestion = (input)=>{
      this.setState(()=>({
        question:input,
      }))
  }

  handleChangeAnswer = (input)=>{
      this.setState(()=>({
        answer:input,
      }))
  }

  submitNewCard = () =>{
    const {question, answer} = this.state;
    const {dispatch, entryId} = this.props;
    this.setState(()=>({
      question : '',
      answer : ''
    }))
    dispatch(handleAddCard(entryId,question,answer));
    this.toHome()
  }

  toHome = () => {
    this.props.navigation.dispatch(
      NavigationActions.back()
    )
  }

  render(){
    const {deck, entryId} = this.props
    return(
      <KeyboardAvoidingView behavior='padding' style={styles.container}>
        <Text style={styles.title}>
           {`Add new Card to Deck "${deck.title}"`}
        </Text>
        <TextInput
          placeholder={'Add a Question'}
          value={this.state.question}
          style={styles.input}
          onChangeText={this.handleChangeQuestion}
        />
        <TextInput
          placeholder={'Add an Answer'}
          value={this.state.answer}
          style={styles.input}
          onChangeText={this.handleChangeAnswer}
        />
      <TouchableOpacity
        disabled={this.state.question === '' || this.state.answer === ''}
        activeOpacity = { .5 }
        onPress={this.submitNewCard}>
        <View style={(this.state.question === '' || this.state.answer === '')
          ? styles.btnDisabled
          : styles.btnEnabled}>
          <Text>
            Add Card
          </Text>
        </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  title:{
    textAlign:'center',
    fontSize:20,
    paddingTop:10,
    paddingBottom:20
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

function mapStateToProps ({decks},{ navigation }) {
  const { entryId } = navigation.state.params
  return {
    entryId,
    deck:decks[entryId]
  }
}

export default connect(mapStateToProps)(AddCard)
