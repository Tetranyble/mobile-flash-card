import {getDecks,removeDeck,saveDeck, addCard, saveScore} from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const INITIALIZED_DECKS = 'INITIALIZED_DECKS';
export const CREATE_DECK = 'CREATE_DECK'

export function receiveDecks(decks){
  return{
    type : RECEIVE_DECKS,
    decks
  }
}

export function initializedDecks(){
  return{
    type : INITIALIZED_DECKS,
    initialized:true
  }
}

function createDeckAction (title) {
  return {
    type: CREATE_DECK,
    title,
  }
}

export function handleGetDecks()
{
  return (dispatch) => {
    dispatch(showLoading())
    return getDecks()
    .then((decks) => {
      dispatch(receiveDecks(decks))
      dispatch(hideLoading())
      dispatch(initializedDecks())
    })
  }
}

export function handleCreateDeck(title)
{
  return (dispatch) => {
    dispatch(createDeckAction(title))
    dispatch(showLoading())
    return saveDeck(title)
    .then((decks) => {
      //dispatch(receiveDecks(decks))
      dispatch(hideLoading())
    })
  }
}

export function handleRemoveDeck(title)
{
  return (dispatch) => {
    dispatch(showLoading())
    return removeDeck(title)
    .then((decks) => {
      dispatch(receiveDecks(decks))
      dispatch(hideLoading())
    })
  }
}

export function handleAddCard(deck,question,answer)
{
  return (dispatch) => {
    dispatch(showLoading())
    return addCard(deck,question,answer)
    .then((decks) => {
      dispatch(receiveDecks(decks))
      dispatch(hideLoading())
    })
  }
}

export function handleSaveScore(deck,score)
{
  return (dispatch) => {
    dispatch(showLoading())
    return saveScore(deck,score)
    .then((decks) => {
      dispatch(receiveDecks(decks))
      dispatch(hideLoading())
    })
  }
}

export function handleGetCards(deck)
{
    return{
      type : GET_CARDS,
      id
    }
}



export function handleRemoveCard(deck,id)
{
  return{
    type : REMOVE_CARD,
    deck,
    index
  }
}
