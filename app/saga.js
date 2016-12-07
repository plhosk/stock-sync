// import { take, select } from 'redux-saga/effects'

import chartsSagas from './charts/chartsSagas'

// // Log every Redux action
// function* logActions() {
//   while (true) { //eslint-disable-line
//     const action = yield take()
//     const state = yield select()
//     console.log('action:', action, 'state:', state) //eslint-disable-line
//   }
// }

export default function* rootSaga() {
  yield [
    // logActions(),
    chartsSagas(),
  ]
}
