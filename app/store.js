import { applyMiddleware, compose, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

import reducer, { initialState } from './reducer'
import rootSaga from './saga'

const socket = io(process.env.SERVER_URL)
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/')

const sagaMiddleware = createSagaMiddleware()

let storeEnhancers = applyMiddleware(sagaMiddleware, socketIoMiddleware)

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  storeEnhancers = compose(storeEnhancers, window.devToolsExtension())
}

const store = createStore(reducer, initialState, storeEnhancers)

let sagaTask = sagaMiddleware.run(rootSaga)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(reducer)
  })
  module.hot.accept('./saga', () => {
    sagaTask.cancel()
    sagaTask = sagaMiddleware.run(rootSaga)
  })
}

export default store
