import React, {Component} from 'react'
import {View, Text, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import {connect} from 'react-redux'
import { white, orange } from '../utils/colors'

class Deck extends Component{
  render(){
    const {entryId} = this.props
    const {title, score, questions} = this.props.deck;
    const disableQuiz = questions.length === 0 ? true : false
    const quizBtnStyle = disableQuiz ? styles.disabled : styles.enabled
    return(
      <View style={styles.container}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.cards}>
          {`Cards in this deck: ${questions.length}`}
        </Text>
        <Text style={styles.highscore}>
          {`Highscore: ${score} Points`}
        </Text>

        <TouchableOpacity
          activeOpacity = { .5 }
          disabled = {disableQuiz}
          onPress={()=>this.props.navigation.navigate(
            'Quiz',
            {entryId : entryId}
          )}>
          <View style={[styles.btnBasic,styles.btnQuiz,quizBtnStyle]}>
            <Text style={styles.btnTxt}>
              Start Quiz
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity = { .5 }
          onPress={()=>this.props.navigation.navigate(
            'AddCard',
            {entryId : entryId}
          )}>
          <View style={[styles.btnBasic,styles.btnAdd]}>
            <Text style={styles.btnTxt}>
              Add Cards
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    flex:1,
    alignItems:'center',
    backgroundColor: white,
    padding: 10,
    margin:10,
   },

   title:{
     fontSize:20,
     paddingTop:10,
     paddingBottom:20
  },

  cards:{
    fontSize:14,
    paddingBottom:0
 },

 highscore:{
   fontSize:14,
   paddingTop:10,
   paddingBottom:20
},

  btnBasic:{
    margin:10,
    padding : 40,
    paddingTop : 20,
    paddingBottom : 20,
    backgroundColor: white,
    borderWidth: 1,
    width : 200,
    borderRadius: Platform.OS === 'ios' ? 10 : 2
  },

  btnAdd:{
    borderColor : orange
  },

  btnQuiz:{
    borderColor : orange,
  },

  btnTxt:{
    textAlign : 'center'
  },

  disabled:{
    opacity:.3
  },

  enabled:{
    opacity:1
  }
})

function mapStateToProps ({decks,loadingBar},{ navigation }) {
  const { entryId } = navigation.state.params
  return {
    entryId,
    deck:decks[entryId]
  }
}

export default connect(mapStateToProps)(Deck)
