import { combineReducers } from 'redux'

const chartsById = (state = {}, action) => {
  switch (action.type) {
    case 'CHARTS_ADD_CHART': {
      const { chartId, symbol } = action.payload
      const chart = {
        id: chartId,
        symbol,
        loading: true,
        hidden: false,
      }
      return {
        ...state,
        [chartId]: chart,
      }
    }

    case 'CHARTS_SHOW_LOADING_INDICATOR': {
      const { chartId } = action.payload
      const chart = state[chartId]
      return {
        ...state,
        [chartId]: {
          ...chart,
          loading: true,
        },
      }
    }

    case 'CHARTS_HIDE_CHART': {
      const { chartId } = action.payload
      const chart = state[chartId]
      return {
        ...state,
        [chartId]: {
          ...chart,
          hidden: true,
        },
      }
    }

    case 'CHARTS_REPLACE_ALL':
      return action.payload.byId

    default:
      return state
  }
}

const allCharts = (state = [], action) => {
  switch (action.type) {
    case 'CHARTS_MOVE_UP': {
      const { chartId } = action.payload
      const oldIndex = state.indexOf(chartId)
      if (oldIndex === 0) return state
      return state
        .slice(0, oldIndex - 1)
        .concat([chartId, state[oldIndex - 1]])
        .concat(state.slice(oldIndex + 1))
    }
    case 'CHARTS_MOVE_DOWN': {
      const { chartId } = action.payload
      const oldIndex = state.indexOf(chartId)
      if (oldIndex === state.length - 1) return state
      return state
        .slice(0, oldIndex)
        .concat([state[oldIndex + 1], chartId])
        .concat(state.slice(oldIndex + 2))
    }
    case 'CHARTS_ADD_CHART': {
      const { chartId, index } = action.payload
      return state
        .slice(0, index)
        .concat(chartId)
        .concat(state.slice(index))
    }
    case 'CHARTS_REPLACE_ALL': {
      return action.payload.allIds
    }
    default: {
      return state
    }
  }
}

const chartsReducer = combineReducers({
  byId: chartsById,
  allIds: allCharts,
})

export default chartsReducer
