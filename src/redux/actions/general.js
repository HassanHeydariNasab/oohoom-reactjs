import {
  ADD_ITEM_TO_ARRAY,
  CLEAR_ERRORS,
  CLEAR_FORM,
  REMOVE_ITEM_FROM_ARRAY,
  SET_FIELD,
} from '../constants/general'

export const setFieldAction = (page, field, value) => ({
  type: SET_FIELD,
  payload: {
    page,
    field,
    value,
  },
})

export const addItemToArrayAction = (page, field, value) => ({
  type: ADD_ITEM_TO_ARRAY,
  payload: {
    page,
    field,
    value,
  },
})

export const removeItemFromArrayAction = (page, field, value) => ({
  type: REMOVE_ITEM_FROM_ARRAY,
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

export const clearFormAction = (form) => ({
  type: CLEAR_FORM,
  payload: {
    form,
  },
})
