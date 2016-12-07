import { combineReducers } from 'redux'

import chartsReducer from './charts/chartsReducer'

const initialState = {
  charts: {
    byId: {},
    allIds: [],
  },
}

const reducer = combineReducers({
  charts: chartsReducer,
})

export default reducer
export { initialState }
