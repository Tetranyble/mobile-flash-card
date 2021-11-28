import { RECEIVE_DECKS, CREATE_DECK } from '../actions/decks'

export default function decks(state = {}, action){
  switch (action.type)
  {
    case RECEIVE_DECKS :
    return {
      ...action.decks
    }

    case CREATE_DECK:
    alert('CREATE_DECK : '+action.title)
    return {
      ...state,
      [action.title]:{
        score : 0,
        playcount : 0,
        title : action.title,
        questions : []
      }
    }

    default :
      return state
  }
}
