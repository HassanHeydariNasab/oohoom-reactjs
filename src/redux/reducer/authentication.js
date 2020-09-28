import {
  LOGOUT,
  SLIDE_DISPLAY_FLEX,
  SLIDE_FADE_IN,
  SLIDE_FADE_OUT,
} from '../constants/authentication'

import { FETCH_AUTHENTICATED_USER_SUCCESS } from '../constants/api'

const initial = {
  slide_fade_in: 'start',
  slide_fade_out: 'nothing',
  slide_display_flex: 'start',
  user: null,
}

export default (state = initial, action) => {
  switch (action.type) {
    case FETCH_AUTHENTICATED_USER_SUCCESS:
      return { ...state, user: action.data }
    case LOGOUT:
      return { ...state, user: null }
    case SLIDE_FADE_IN:
      return { ...state, slide_fade_in: action.payload.name }
    case SLIDE_FADE_OUT:
      return { ...state, slide_fade_out: action.payload.name }
    case SLIDE_DISPLAY_FLEX:
      return { ...state, slide_display_flex: action.payload.name }
    default:
      return state
  }
}
