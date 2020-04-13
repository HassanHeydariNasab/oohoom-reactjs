import authentication from './authentication'
import { combineReducers } from 'redux'
import general from './general'
import notification from './notification'
import project from './project'
import projects from './projects'
import router from './router'

const rootReducer = combineReducers({
  general,
  authentication,
  notification,
  router,
  projects,
  project,
})
export default rootReducer
