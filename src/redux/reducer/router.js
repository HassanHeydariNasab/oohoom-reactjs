import { SET_ROUTE } from '../constants/router'

const initial = {
  route: { name: 'empty', props: {} },
}

export default (state = initial, action) => {
  switch (action.type) {
    case SET_ROUTE:
      return { ...state, route: action.payload }
    default:
      return state
  }
}
