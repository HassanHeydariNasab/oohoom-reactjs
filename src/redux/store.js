import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import logger from 'redux-logger'
import reducer from './reducer'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  compose(applyMiddleware(sagaMiddleware, logger))
)

sagaMiddleware.run(sagas)

export default store
