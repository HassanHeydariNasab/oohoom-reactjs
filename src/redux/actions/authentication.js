import { LOGOUT } from '../constants/authentication'

export const logoutAction = (should_goto_home = false) => ({
  type: LOGOUT,
  payload: {
    should_goto_home,
  },
})
