import { SET_ROUTE } from '../constants/router'

const initial = {
  route: { name: 'home' },
}

export default (state = initial, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, route: action.payload }
    default:
      return state
  }
}
