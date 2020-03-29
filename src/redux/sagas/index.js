import { all, fork, put, select, takeEvery } from 'redux-saga/effects'
import { createRequestInstance, watchRequests } from 'redux-saga-requests'
import { slideDisplayFlexAction, slideFadeInAction } from '../actions/slide.js'

import { BASE_URL } from '../../.local_configs.js'
import { CODE_SUCCESS } from '../constants'
import { createDriver } from 'redux-saga-requests-fetch'

/**
 * rootSaga
 */
export default function* root() {
  yield takeEvery(CODE_SUCCESS, function*() {
    const authenticationState = yield select(state => state.authentication)
    if (authenticationState.is_user_exists) {
      setTimeout(function*() {
        yield put(slideDisplayFlexAction('login'))
      }, 1000)
      setTimeout(function*() {
        yield put(slideFadeInAction('login'))
      }, 1300)
    } else {
    }
  })
  yield createRequestInstance({
    driver: createDriver(fetch, {
      baseURL: BASE_URL
    })
  })
  yield watchRequests() // listen to action.request
}
