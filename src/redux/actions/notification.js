import { SET_LOADING } from '../constants/notification'
export const setLoadingAction = is_loading => ({
  type: SET_LOADING,
  payload: {
    is_loading
  }
})
