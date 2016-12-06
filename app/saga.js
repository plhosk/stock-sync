import { take } from 'redux-saga/effects'

// Log every Redux action
function* logActions() {
  while (true) { //eslint-disable-line
    const action = yield take()
    // const state = yield select()
    // console.log(`action ${JSON.stringify(action)}`) //eslint-disable-line
    console.log(action) //eslint-disable-line
    // console.log(`state ${JSON.stringify(state)}`) //eslint-disable-line
  }
}

export default function* rootSaga() {
  yield [
    logActions(),
  ]
}
