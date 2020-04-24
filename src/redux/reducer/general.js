import {
  ADD_ITEM_TO_ARRAY,
  CLEAR_ERRORS,
  CLEAR_FORM,
  REMOVE_ITEM_FROM_ARRAY,
} from '../constants/general'

import { SET_FIELD } from '../constants/general'

const initial = {}

export default (state = initial, action) => {
  if (action.type.endsWith('_ERROR')) {
    if (action.error.status === 401) {
      window.localStorage.removeItem('token')
      window.location = '/auth'
    } else {
      return { ...state, [`${action.type}`]: action.error.data.description }
    }
  } else if (action.type === CLEAR_FORM) {
    let new_state = { ...state }
    for (let field in state) {
      if (field.startsWith(`${action.payload.form}__`)) {
        delete new_state[field]
      }
    }
    return new_state
  }
  let key
  let value
  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        [`${action.payload.page}__${action.payload.field}`]: action.payload
          .value,
      }
    case ADD_ITEM_TO_ARRAY:
      key = `${action.payload.page}__${action.payload.field}`
      value = action.payload.value
      if (Array.isArray(state[key])) {
        let new_array = [...state[key]]
        if (new_array.indexOf(value) === -1) {
          new_array.push(value)
        }
        return { ...state, [key]: new_array }
      } else {
        return { ...state, [key]: [value] }
      }
    case REMOVE_ITEM_FROM_ARRAY:
      key = `${action.payload.page}__${action.payload.field}`
      value = action.payload.value
      if (Array.isArray(state[key])) {
        let new_array = [...state[key]]
        let i = new_array.indexOf(value)
        if (i !== -1) {
          new_array.splice(i, 1)
        }
        return { ...state, [key]: new_array }
      } else {
        return { ...state, [key]: [] }
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
