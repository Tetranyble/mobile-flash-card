import { combineReducers } from 'redux'
import decks from './decks'
import initialized from './initialized'
import { loadingBarReducer } from 'react-redux-loading'

export default combineReducers({
  decks,
  initialized,
  loadingBar :loadingBarReducer
})
