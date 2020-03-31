import { SET_LOADING, SET_MOBILE } from '../constants'

export const setMobileAction = mobile => ({
  type: SET_MOBILE,
  payload: {
    mobile
  }
})

export const setLoadingAction = is_loading => ({
  type: SET_LOADING,
  payload: {
    is_loading
  }
})
