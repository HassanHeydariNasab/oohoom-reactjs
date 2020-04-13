import { CLEAR_ERRORS } from '../constants/general'
import { SET_FIELD } from '../constants/general'

const initial = {}

export default (state = initial, action) => {
  if (action.type.endsWith('_ERROR')) {
    if (action.error.status === 401) {
      window.location = '/auth'
    } else {
      return { ...state, [`${action.type}`]: action.error.data.description }
    }
  }
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [`${action.payload.page}__${action.payload.field}`]: action.payload
          .value,
      }
    case CLEAR_ERRORS:
      return {
        ...state,
        [`${action.payload.api}`]: null,
      }
    default:
      return state
  }
}
