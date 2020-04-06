import {
  CLEAR_ERRORS,
  SET_CODE,
  SET_MOBILE,
  SET_NAME,
  SET_ROLE
} from '../constants/authentication'

export const setMobileAction = mobile => ({
  type: SET_MOBILE,
  payload: {
    mobile
  }
})

export const setCodeAction = code => ({
  type: SET_CODE,
  payload: {
    code
  }
})

export const setNameAction = name => ({
  type: SET_NAME,
  payload: {
    name
  }
})

export const setRoleAction = role => ({
  type: SET_ROLE,
  payload: {
    role
  }
})

export const clearErrorsAction = () => ({
  type: CLEAR_ERRORS
})
