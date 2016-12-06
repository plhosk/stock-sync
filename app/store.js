import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer, { initialState } from './reducer'
import rootSaga from './saga'

const sagaMiddleware = createSagaMiddleware()
let storeEnhancers = applyMiddleware(sagaMiddleware)

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  storeEnhancers = compose(storeEnhancers, window.devToolsExtension())
}

const store = createStore(reducer, initialState, storeEnhancers)

sagaMiddleware.run(rootSaga)

export default store
