import React from 'react'
import {View, Text, StyleSheet, Platform, TouchableOpacity} from 'react-native'
import { white, red, blue } from '../utils/colors'

export default function DeckItemRenderer ({ item, handleDetail, handleDelete }) {
  const noCards = item.questions.length === 0 ? true : false
  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        {item.title}
      </Text>

      {noCards === true &&
      <Text style={styles.cards}>
        👋 You didn't add any card yet!
      </Text>
      }

      {noCards === false &&
      <Text style={styles.cards}>
        {`Cards in this deck: ${item.questions.length}`}
      </Text>
      }

      {(noCards === false && Number(item.playcount) === 0) &&
      <Text style={styles.highscore}>
        👋 You haven started this deck yet!
      </Text>
      }

      {(noCards === false && Number(item.playcount) !== 0) &&
      <Text style={styles.highscore}>
        {`Highscore: ${item.score} Points`}
      </Text>
      }

      <TouchableOpacity
        activeOpacity = { .5 }
        onPress={()=>{handleDetail()}}>
        <View style={[styles.btnBasic,styles.btnDetail]}>
          <Text style={styles.btnTxt}>
            Open Deck
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity = { .5 }
        onPress={()=>{handleDelete()}}>
        <View style={[styles.btnBasic,styles.btnRemove]}>
          <Text style={styles.btnTxt}>
            Delete Deck
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
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
      justifyContent: 'center',
      shadowRadius: 2,
      shadowOpacity: 0.8,
      shadowColor : 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        height:3,
       }
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
    borderWidth: 2,
    width : 200,
    borderRadius: Platform.OS === 'ios' ? 10 : 2
  },

  btnDetail:{
    borderColor : blue
  },

  btnRemove:{
    borderColor : red
  },

  btnTxt:{
    textAlign : 'center'
  },
})
