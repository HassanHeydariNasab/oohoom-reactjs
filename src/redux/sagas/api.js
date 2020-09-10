import {
  CODE_SUCCESS,
  REGISTRATION_SUCCESS,
  TOKEN_SUCCESS,
  ASSIGN_PROJECT_SUCCESS,
  FETCH_PROJECT_SUCCESS,
  FETCH_USER_SUCCESS,
  FETCH_INPUT_FILES_SUCCESS,
  CREATE_FILE_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  CREATE_MESSAGE_SUCCESS,
  FETCH_MESSAGES_SUCCESS,
} from '../constants/api'
import {
  delay,
  put,
  takeEvery,
  select,
  all,
  take,
  call,
} from 'redux-saga/effects'
import {
  slideDisplayFlexAction,
  slideFadeInAction,
  slideFadeOutAction,
} from '../actions/slide.js'

import { LOGOUT } from '../constants/authentication'
import { navigate } from '../../Routes'
import {
  fetchInputFilesAction,
  fetchOutputFilesAction,
  clearOutputFilesAction,
  fetchMessagesAction,
} from '../actions/api'
import takeAll from './takeAll'

function* fetchMessagesInterval() {
  while (true) {
    const generalState = yield select((state) => state.general)
    const routerState = yield select((state) => state.router)
    if (
      routerState.route.name === 'project' &&
      generalState.messages__is_messages_modal_open
    ) {
      yield put(fetchMessagesAction(routerState.route.props.project_id))
    }
    yield delay(2000)
  }
}

var should_goto_recent_message = true

function* fetchProjectFlow() {
  while (true) {
    if (window.localStorage.getItem('token')) {
      yield call(
        takeAll,
        [FETCH_PROJECT_SUCCESS, FETCH_USER_SUCCESS],
        function* (actions) {
          var project_action = actions[0]
          var user_action = actions[1]
          yield put(fetchInputFilesAction(project_action.data._id.$oid))
          if (user_action && user_action.data) {
            if (project_action.data.employee) {
              if (
                project_action.data.employee._id.$oid ===
                  user_action.data._id.$oid ||
                project_action.data.employer._id.$oid ===
                  user_action.data._id.$oid
              ) {
                yield put(fetchOutputFilesAction(project_action.data._id.$oid))
                yield fetchMessagesInterval()
              } else {
                console.warn(1)
                yield put(clearOutputFilesAction()) // clear recent project's files
              }
            } else {
              console.warn(2)
              yield put(clearOutputFilesAction()) // clear recent project's files
            }
          }
        }
      )
    } else {
      var action = yield take(FETCH_PROJECT_SUCCESS)
      console.warn(3)
      yield put(fetchInputFilesAction(action.data._id.$oid))
      yield put(clearOutputFilesAction()) // clear recent project's files
    }
  }
}

export default function* api() {
  yield takeEvery(CODE_SUCCESS, function* (action) {
    yield put(slideFadeOutAction('code'))
    yield put(slideFadeInAction('nothing'))
    yield delay(1000)
    if (action.data.is_user_exists) {
      yield put(slideDisplayFlexAction('login'))
      yield delay(300)
      yield put(slideFadeInAction('login'))
    } else {
      yield put(slideDisplayFlexAction('register'))
      yield delay(300)
      yield put(slideFadeInAction('register'))
    }
  })
  yield takeEvery(TOKEN_SUCCESS, function* (action) {
    window.localStorage.setItem('token', action.data.token)
    const routerState = yield select((state) => state.router)
    yield navigate(routerState.route.props.back_url)
  })
  yield takeEvery(REGISTRATION_SUCCESS, function* (action) {
    window.localStorage.setItem('token', action.data.token)
    const routerState = yield select((state) => state.router)
    yield navigate(routerState.route.props.back_url)
  })
  yield takeEvery(LOGOUT, function* (action) {
    window.localStorage.clear()
    if (action.payload.should_goto_home) {
      yield navigate('/')
    }
  })

  yield takeEvery(ASSIGN_PROJECT_SUCCESS, function* (action) {
    yield window.location.reload()
  })

  yield takeEvery(CREATE_FILE_SUCCESS, function* (action) {
    yield window.location.reload()
  })

  yield takeEvery(CREATE_PROJECT_SUCCESS, function* (action) {
    yield navigate(`/projects/${action.data._id.$oid}/`)
  })

  yield takeEvery(CREATE_MESSAGE_SUCCESS, function* (action) {
    should_goto_recent_message = true
    yield put(fetchMessagesAction(action.data.project_id.$oid))
  })

  yield takeEvery(FETCH_MESSAGES_SUCCESS, function* (action) {
    if (should_goto_recent_message) {
      yield (window.location.hash = '#recent-message')
    }
    should_goto_recent_message = false
  })
  yield fetchProjectFlow()
}
