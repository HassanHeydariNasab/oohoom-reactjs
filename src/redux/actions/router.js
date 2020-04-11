import { SET_ROUTE } from '../constants/router'
export const setRouteAction = (route) => ({
  type: SET_ROUTE,
  payload: route,  // name, ...
})
