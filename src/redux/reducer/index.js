import authentication from './authentication'
import { combineReducers } from 'redux'
import notification from './notification'

const rootReducer = combineReducers({
  authentication,
  notification
})
export default rootReducer
