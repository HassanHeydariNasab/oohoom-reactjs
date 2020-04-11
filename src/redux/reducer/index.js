import authentication from './authentication'
import { combineReducers } from 'redux'
import notification from './notification'
import router from './router'

const rootReducer = combineReducers({
  authentication,
  notification,
  router,
})
export default rootReducer
