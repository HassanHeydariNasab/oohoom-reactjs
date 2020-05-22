import { FETCH_PROJECT_ERROR, FETCH_PROJECT_SUCCESS } from '../constants/api'

const initial = { project: {} }

export default (state = initial, action) => {
  switch (action.type) {
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        ...action.data,
      }
    case FETCH_PROJECT_ERROR:
      return { ...state, errors: action.error.data.description }
    default:
      return state
  }
}
