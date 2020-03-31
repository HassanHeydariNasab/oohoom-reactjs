import {
  CLEAR_ERRORS,
  SET_CODE,
  SET_LOADING,
  SET_MOBILE
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

export const setLoadingAction = is_loading => ({
  type: SET_LOADING,
  payload: {
    is_loading
  }
})

export const clearErrorsAction = () => ({
  type: CLEAR_ERRORS
})
