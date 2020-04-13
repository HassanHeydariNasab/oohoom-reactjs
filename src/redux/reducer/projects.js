import { FETCH_PROJECTS_ERROR, FETCH_PROJECTS_SUCCESS } from '../constants/api'

const initial = {
  projects: [],
}

export default (state = initial, action) => {
  switch (action.type) {
    case FETCH_PROJECTS_SUCCESS:
      return {
        ...state,
        projects: action.data,
      }
    case FETCH_PROJECTS_ERROR:
      return { ...state, errors: action.error.data.description }
    default:
      return state
  }
}
