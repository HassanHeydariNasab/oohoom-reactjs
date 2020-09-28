import { FETCH_USER_SUCCESS, CLEAR_USER } from '../constants/api'

const initial = {
  user: null,
}

export default (state = initial, action) => {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return { ...state, user: action.data }
    case CLEAR_USER:
      return { ...state, user: null }
    default:
      return state
  }
}
