import { take, select } from 'redux-saga/effects'

// Log every Redux action
function* logActions() {
  while (true) { //eslint-disable-line
    const action = yield take()
    const state = yield select()
    console.log(action, state) //eslint-disable-line
  }
}

export default function* rootSaga() {
  yield [
    logActions(),
  ]
}
