import { INITIALIZED_DECKS } from '../actions/decks'

export default function initialized(state = null, action){
  switch (action.type)
  {
    case INITIALIZED_DECKS :
    return action.initialized

    default :
      return state
  }
}
