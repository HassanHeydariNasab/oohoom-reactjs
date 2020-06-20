import { createRequestInstance, watchRequests } from 'redux-saga-requests'

import { BASE_URL } from '../../local_configs.js'
import { createDriver } from 'redux-saga-requests-fetch'

export default function* requests() {
  yield createRequestInstance({
    driver: createDriver(fetch, {
      baseURL: BASE_URL,
    }),
  })
  yield watchRequests() // listen to action.request
}
