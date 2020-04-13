import { CLEAR_ERRORS, SET_FIELD } from '../constants/general'

export const setFieldAction = (page, field, value) => ({
  type: SET_FIELD,
  payload: {
    page,
    field,
    value,
  },
})

export const clearErrorsAction = (API_ERROR) => ({
  type: CLEAR_ERRORS,
  payload: {
    api: API_ERROR,
  },
})
