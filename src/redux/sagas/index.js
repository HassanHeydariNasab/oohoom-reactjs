import {
  CODE_SUCCESS,
  REGISTRATION_SUCCESS,
  TOKEN_SUCCESS,
} from '../constants/api'
import { createRequestInstance, watchRequests } from 'redux-saga-requests'
import { delay, put, takeEvery, select } from 'redux-saga/effects'
import {
  slideDisplayFlexAction,
  slideFadeInAction,
  slideFadeOutAction,
} from '../actions/slide.js'

import { BASE_URL } from '../../local_configs.js'
import { LOGOUT } from '../constants/authentication'
import { createDriver } from 'redux-saga-requests-fetch'
import { navigate } from '../../Routes'

/**
 * rootSaga
 */
export default function* root() {
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

  yield createRequestInstance({
    driver: createDriver(fetch, {
      baseURL: BASE_URL,
    }),
  })
  yield watchRequests() // listen to action.request
}
