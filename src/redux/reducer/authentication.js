import {
  CODE_ERROR,
  CODE_SUCCESS,
  SET_LOADING,
  SET_MOBILE,
  SLIDE_DISPLAY_FLEX,
  SLIDE_FADE_IN,
  SLIDE_FADE_OUT
} from '../constants'

const initial = {
  mobile: '',
  code: '',
  name: '',
  jwt: '',
  loading: false,
  is_user_exists: false,
  slide_fade_in: 'start',
  slide_fade_out: 'nothing',
  slide_display_flex: 'start'
}

export default (state = initial, action) => {
  switch (action.type) {
    case CODE_SUCCESS:
      return {
        ...state,
        is_user_exists: action.data.is_user_exists
      }
    case CODE_ERROR:
      console.warn(JSON.stringify(action.error.data))
      return { ...state }
    case SLIDE_FADE_IN:
      return { ...state, slide_fade_in: action.payload.name }
    case SLIDE_FADE_OUT:
      return { ...state, slide_fade_out: action.payload.name }
    case SLIDE_DISPLAY_FLEX:
      return { ...state, slide_display_flex: action.payload.name }
    case SET_MOBILE:
      return { ...state, mobile: action.payload.mobile }
    case SET_LOADING:
      return {...state, loading: action.payload.is_loading}
    default:
      return state
  }
}
