import { CREATE_PROJECT_SUCCESS } from '../constants/api'

const initial = {
  create_project__is_saved: true
}

export default (state = initial, action) => {
  switch (action.type) {
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        create_project__is_saved: true,
        create_project___id: action.data._id
      }
    default:
      return state
  }
}
