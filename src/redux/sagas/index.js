import {
  CODE_SUCCESS,
  REGISTRATION_SUCCESS,
  TOKEN_SUCCESS,
  ASSIGN_PROJECT_SUCCESS,
  FETCH_PROJECT_SUCCESS,
  FETCH_USER_SUCCESS,
} from '../constants/api'
import { createRequestInstance, watchRequests } from 'redux-saga-requests'
import {
  delay,
  put,
  takeEvery,
  select,
  all,
  take,
  spawn,
} from 'redux-saga/effects'
import {
  slideDisplayFlexAction,
  slideFadeInAction,
  slideFadeOutAction,
} from '../actions/slide.js'

import { BASE_URL } from '../../local_configs.js'
import { LOGOUT } from '../constants/authentication'
import { createDriver } from 'redux-saga-requests-fetch'
import { navigate } from '../../Routes'
import { fetchInputFilesAction, fetchOutputFilesAction } from '../actions/api'
import api from './api'
import requests from './requests'

/**
 * rootSaga
 */
export default function* root() {
  //  yield all([api(), requests()])
  yield spawn(requests)
  yield spawn(api)
}
