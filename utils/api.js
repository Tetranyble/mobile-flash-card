import { AsyncStorage } from 'react-native'
const API_KEY = 'Udacity:MobileFlashCards.0.0.12'


const mockData = {
    React: {
        score : 0,
        playcount : 0,
        title: 'React',
        questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        }
      ]
    }
  }

export function getDecks(){
  return AsyncStorage.getItem(API_KEY)
    .then((results)=>{
      if(results === null)
      {
        return AsyncStorage.setItem(API_KEY, JSON.stringify(mockData))
        .then(() =>{
          return AsyncStorage.getItem(API_KEY)
        })
        .then((results) =>{
          return JSON.parse(results);
        })
      }
      return JSON.parse(results);
    })
}

export function saveDeck(title){
  return AsyncStorage.mergeItem(API_KEY, JSON.stringify({
    [title]:{
      score : 0,
      playcount : 0,
      title : title,
      questions : []
    }})
  )
  .then((error)=>{
    return AsyncStorage.getItem(API_KEY)
  })
  .then((results)=>{
    return JSON.parse(results);
  })
}

export function saveScore(deck, score){
  return AsyncStorage.getItem(API_KEY)
  .then((results)=>{
    const data = JSON.parse(results);
    data[deck]['score'] = score
    data[deck]['playcount'] = Number(data[deck]['playcount'])+1
    return AsyncStorage.setItem(API_KEY, JSON.stringify(data));
  })
  .then(()=>{
    return AsyncStorage.getItem(API_KEY)
  })
  .then((results)=>{
    return JSON.parse(results);
  })
}

export function removeDeck(title){
  return AsyncStorage.getItem(API_KEY)
    .then((results)=>{
      const data = JSON.parse(results);
      data[title] = undefined
      delete data[title]
      return AsyncStorage.setItem(API_KEY, JSON.stringify(data));
    })
    .then(()=>{
      return AsyncStorage.getItem(API_KEY)
    })
    .then((results)=>{
      return JSON.parse(results);
    })
}
/*
const merged = {
  ...mockData,
  ['React']:{...mockData['React'],
  questions:mockData['React'].questions.unshift({question:'Question1', answer:'Answer1'})
}}
*/

export function addCard(deck,question,answer){
  return AsyncStorage.getItem(API_KEY)
  .then((results)=>{
    const data = JSON.parse(results);
    data[deck]['questions'].unshift({question,answer})
    return AsyncStorage.setItem(API_KEY, JSON.stringify(data));
  })
  .then(()=>{
    return AsyncStorage.getItem(API_KEY)
  })
  .then((results)=>{
    return JSON.parse(results);
  })
}
