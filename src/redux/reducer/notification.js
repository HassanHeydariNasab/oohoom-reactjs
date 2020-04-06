import { SET_LOADING } from '../constants/notification'

const initial = {
  loading: false
}

export default (state = initial, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload.is_loading }
    default:
      return state
  }
}
