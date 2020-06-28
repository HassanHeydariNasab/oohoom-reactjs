import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from 'redux-logger'
import reducer from './reducer'
import sagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
)

sagaMiddleware.run(sagas)

export default store
