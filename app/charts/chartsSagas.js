import { takeEvery } from 'redux-saga'
import { put } from 'redux-saga/effects'

function* relayActionsToSocket(action) {
  const socketAction = {
    ...action,
    type: `server/${action.type}`,
  }
  yield put(socketAction)
}

export default function* chartsSagas() {
  yield takeEvery([
    'CHARTS_ADD_CHART',
    'CHARTS_HIDE_CHART',
    'CHARTS_MOVE_UP',
    'CHARTS_MOVE_DOWN',
  ], relayActionsToSocket)
}
