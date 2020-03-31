import { CODE_ERROR, CODE_SUCCESS } from '../constants'
import {
  all,
  call,
  delay,
  fork,
  put,
  select,
  takeEvery
} from 'redux-saga/effects'
import { createRequestInstance, watchRequests } from 'redux-saga-requests'
import {
  slideDisplayFlexAction,
  slideFadeInAction,
  slideFadeOutAction
} from '../actions/slide.js'

import { BASE_URL } from '../../local_configs.js'
import { createDriver } from 'redux-saga-requests-fetch'
import { setLoadingAction } from '../actions/authentication.js'

/**
 * rootSaga
 */
export default function* root() {
  yield takeEvery(CODE_SUCCESS, function*() {
    const authenticationState = yield select(state => state.authentication)
    yield put(slideFadeOutAction('code'))
    yield put(slideFadeInAction('nothing'))
    yield delay(1000)
    if (authenticationState.is_user_exists) {
      yield put(slideDisplayFlexAction('login'))
      yield delay(1300)
      yield put(slideFadeInAction('login'))
    } else {
      yield put(slideDisplayFlexAction('register'))
      yield delay(1300)
      yield put(slideFadeInAction('register'))
    }
    yield put(setLoadingAction(false))
  })
  yield takeEvery(CODE_ERROR, function*() {
    yield delay(1000)
    yield put(setLoadingAction(false))
  })
  yield createRequestInstance({
    driver: createDriver(fetch, {
      baseURL: BASE_URL
    })
  })
  yield watchRequests() // listen to action.request
}
