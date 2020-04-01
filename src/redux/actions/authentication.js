import {
  CLEAR_ERRORS,
  SET_CODE,
  SET_LOADING,
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

export const setLoadingAction = is_loading => ({
  type: SET_LOADING,
  payload: {
    is_loading
  }
})

export const clearErrorsAction = () => ({
  type: CLEAR_ERRORS
})
