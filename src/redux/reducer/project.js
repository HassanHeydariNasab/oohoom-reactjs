import {
  FETCH_PROJECT_ERROR,
  FETCH_PROJECT_SUCCESS,
  FETCH_INPUT_FILES_SUCCESS,
  FETCH_INPUT_FILES_ERROR,
  FETCH_OUTPUT_FILES_SUCCESS,
  FETCH_OUTPUT_FILES_ERROR,
  CLEAR_OUTPUT_FILES,
} from '../constants/api'

const initial = { input_files: [], output_files: [] }

export default (state = initial, action) => {
  switch (action.type) {
    case FETCH_PROJECT_SUCCESS:
      return {
        ...state,
        ...action.data,
      }
    case FETCH_PROJECT_ERROR:
      return { ...state, errors: action.error.data.description }
    case FETCH_INPUT_FILES_SUCCESS:
      return {
        ...state,
        input_files: [...action.data],
      }
    case FETCH_INPUT_FILES_ERROR:
      return { ...state, errors: action.error.data.description }
    case FETCH_OUTPUT_FILES_SUCCESS:
      return {
        ...state,
        output_files: [...action.data],
      }
    case FETCH_OUTPUT_FILES_ERROR:
      return { ...state, errors: action.error.data.description }
    case CLEAR_OUTPUT_FILES:
      return { ...state, output_files: [] }
    default:
      return state
  }
}
