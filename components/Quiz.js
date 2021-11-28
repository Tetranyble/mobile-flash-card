import React, {Component} from 'react'
import FlipCard from 'react-native-flip-card'
import { Ionicons } from '@expo/vector-icons'
import { gray, white, orange, red, green, black } from '../utils/colors'
import { connect } from 'react-redux'
import { handleSaveScore } from '../actions/decks'
import { clearLocalNotification, setLocalNotification } from '../utils/notification'
import {Text, View, StyleSheet, TouchableOpacity, Platform} from 'react-native'

class Quiz extends Component{
  state={
    position:0,
    correctAnswers:0,
    hasEnded:false,
  }

  logAnswer = (answer) => {
    const {cards, entryId} = this.props
    const {position, correctAnswers} = this.state

    this.setState(prevState => ({
      correctAnswers: answer === true ? prevState.correctAnswers + 1 : prevState.correctAnswers,
      position: (cards[prevState.position+1]!==undefined) ? prevState.position+1 : prevState.position,
      hasEnded:(cards[prevState.position+1]!==undefined) ? false : true
    }));
  }

  restart = () => {
    this.setState({
        position:0,
        correctAnswers:0,
        hasEnded:false,
      });
  }

  saveScore = () => {
    const {entryId, navigation, dispatch} = this.props
    const {correctAnswers} = this.state
    clearLocalNotification()
      .then(setLocalNotification)
    dispatch(handleSaveScore(entryId, correctAnswers))
    navigation.navigate('Deck',{entryId})
  }

  calculatePercentage = () => {
    const {correctAnswers} = this.state;
    const {cards} = this.props;
    var len = cards.length;
    return correctAnswers === 0 ? 0 : Math.round((correctAnswers / len)*100)
  }

  render()
  {
    const {cards, entryId} = this.props;
    const {position,correctAnswers, hasEnded} = this.state
    if(cards !== undefined && cards.length > 0 )
    {
      return(
        <View style={{flex: 1}}>
          {!hasEnded &&
            <View style={styles.flipCardContainer}>
              <FlipCard
                style={styles.flipCard}
                friction={10}
                flipHorizontal={false}
                flipVertical={true}>
                  <View style={{flex:1}}>
                    <View style={styles.cardContentTop}>
                      <Text style={styles.cardContentTopText}>
                        Question {position + 1} / {cards.length}
                      </Text>
                    </View>
                    <View style={styles.cardContentCenter}>
                      <Text style={styles.cardContentCenterText}>{cards[position]['question']}</Text>
                    </View>
                    <View style={styles.cardContentBottom}>
                        <View style={[styles.btnBasic,styles.btnDetail]}>
                          <Text style={styles.btnTxt}>
                            Show Answer
                          </Text>
                        </View>
                    </View>
                  </View>

                  <View style={{flex:1}}>
                    <View style={styles.cardContentTop}>
                      <Text style={styles.cardContentTopText}>
                        Answer {position + 1} / {cards.length}
                      </Text>
                    </View>
                    <View style={styles.cardContentCenter}>
                      <Text style={styles.cardContentCenterText}>{cards[position]['answer']}</Text>
                    </View>
                    <View style={styles.cardContentBottom}>
                      <TouchableOpacity
                        activeOpacity = {.5}
                        onPress={() => this.logAnswer(true)}>
                        <View style={[styles.btnBasic,styles.btnDetail]}>
                          <Text style={styles.btnTxt}>
                            Correct
                          </Text>
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity
                        activeOpacity = {.5}
                        onPress={() => this.logAnswer(false)}>
                        <View style={[styles.btnBasic,styles.btnRemove]}>
                          <Text style={styles.btnTxt}>
                            Failed
                          </Text>
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                </FlipCard>
              </View>
          }

          {hasEnded &&
            <View style={styles.flipCard}>
              <View style={{flex:1}}>
                <View style={styles.cardContentCenter}>
                  <Text style={styles.cardContentCenterText}>
                    {`Hooooray! You earned ${this.state.correctAnswers} Point(s)!`}
                  </Text>
                  <Text style={styles.cardContentCenterText}>
                    {`That's ${this.calculatePercentage()}%`}
                  </Text>
                </View>
                <View style={styles.cardContentBottom}>
                  <TouchableOpacity
                    activeOpacity = {.5}
                    onPress={() => this.restart()}>
                    <View style={[styles.btnBasic,styles.btnDetail]}>
                      <Text style={styles.btnTxt}>
                        Restart
                      </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity = {.5}
                    onPress={() => this.saveScore()}>
                    <View style={[styles.btnBasic,styles.btnDetail]}>
                      <Text style={styles.btnTxt}>
                        Save & go back
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          }
        </View>
      )
      return null
    }
  }
}

const styles = StyleSheet.create({
  container:{
    padding: 10,
    margin:10,
   },

   cardContentTop:{
     justifyContent:'center',
     flex:.3
   },

   cardContentTopText:{
     fontSize:20,
     color: gray,
     textAlign:'center'
   },

   cardContentCenter:{
     justifyContent:'center',
     marginLeft:10,
     marginRight:10,
     flex:.4
   },

   cardContentBottom:{
     justifyContent:'center',
     alignItems:'center',
     flex:.3
   },

  flipCardContainer: {
    flex:1,
    flexDirection:'row',
    alignItems:'stretch',
    justifyContent:'center'
  },

  flipCard:{
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:white,
    borderRadius: Platform.OS === 'ios' ? 16 : 2,
    borderWidth:.3,
    borderColor:'#999',
    margin:40,
    marginBottom:40,
    marginTop:40,
    padding:0,
    shadowRadius: 2,
    shadowOpacity: 0.8,
    shadowColor : 'rgba(0,0,0,0.24)',
    shadowOffset: {
      width: 0,
      height:0,
     }
  },

  btnBasic:{
    margin:10,
    padding : 40,
    paddingTop : 20,
    paddingBottom : 20,
    backgroundColor: white,
    borderWidth: 2,
    width : 200,
    borderRadius: Platform.OS === 'ios' ? 10 : 2
  },

  btnDetail:{
    borderColor : green
  },

  btnRemove:{
    borderColor : red
  },

  btnTxt:{
    textAlign : 'center'
  },

  cardContentCenterText:{
    textAlign: 'center',
    color: black,
    fontWeight: 'bold',
    fontSize: 30,
  }
})

function mapStateToProps ({decks,loadingBar},{ navigation }) {
  const { entryId } = navigation.state.params
  return {
    entryId,
    cards:decks[entryId]['questions']
  }
}

export default connect(mapStateToProps)(Quiz)
