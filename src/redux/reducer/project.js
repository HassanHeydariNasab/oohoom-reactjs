import { PROJECT_FORM_SUCCESS } from '../constants/api'

const initial = {
  project_form__is_saved: true
}

export default (state = initial, action) => {
  switch (action.type) {
    case PROJECT_FORM_SUCCESS:
      return {
        ...state,
        project_form__is_saved: true,
        project_form___id: action.data._id
      }
    default:
      return state
  }
}
