const log = require('debug')('chart-sync-quandl-fetch')

const chartsById = (state = {}, action, io) => {
  switch (action.type) {
    case 'server/CHARTS_ADD_CHART': {
      const { chartId, symbol } = action.payload
      log(`initiating fetch. symbol: ${symbol}`)
      fetch('https://www.quandl.com/api/v3/datatables/WIKI/PRICES.json?qopts.columns=date,close' +
      `&date.gte=20160101&ticker=${symbol}&api_key=${process.env.QUANDL_API_KEY}`)
      .then((response) => {
        log(`Fetch response received. status: ${response.status}`)
        if (response.status !== 200) {
          throw new Error('Bad response from server')
        }
        return response.json()
      })
      .then((data) => {
        const prices = data.datatable.data
        log(`prices length: ${prices.length} chartId: ${chartId}`)
        io.emit('action', {
          type: 'CHARTS_RECEIVE_PRICES',
          payload: { chartId, prices },
        })
        if ({}.hasOwnProperty.call(state, chartId)) {
          state[chartId].prices = prices // eslint-disable-line
          state[chartId].loading = false // eslint-disable-line
        }
      })
      .catch(err => log(err))

      const chart = {
        id: chartId,
        symbol,
        loading: true,
        hidden: false,
      }
      state[chartId] = chart // eslint-disable-line
      return state
    }

    case 'server/CHARTS_HIDE_CHART': {
      const { chartId } = action.payload
      if (!{}.hasOwnProperty.call(state, chartId)) return state
      delete state.chartId // eslint-disable-line
      return state
    }

    default:
      return state
  }
}

const allCharts = (state = [], action) => {
  switch (action.type) {
    case 'server/CHARTS_MOVE_UP': {
      const { chartId } = action.payload
      const oldIndex = state.indexOf(chartId)
      if (oldIndex === -1) return state
      if (oldIndex === 0) return state
      return state
        .slice(0, oldIndex - 1)
        .concat([chartId, state[oldIndex - 1]])
        .concat(state.slice(oldIndex + 1))
    }
    case 'server/CHARTS_MOVE_DOWN': {
      const { chartId } = action.payload
      const oldIndex = state.indexOf(chartId)
      if (oldIndex === -1) return state
      if (oldIndex === state.length - 1) return state
      return state
        .slice(0, oldIndex)
        .concat([state[oldIndex + 1], chartId])
        .concat(state.slice(oldIndex + 2))
    }
    case 'server/CHARTS_ADD_CHART': {
      const { chartId, index } = action.payload
      return state
        .slice(0, index)
        .concat(chartId)
        .concat(state.slice(index))
    }
    case 'server/CHARTS_HIDE_CHART': {
      const { chartId } = action.payload
      const oldIndex = state.indexOf(chartId)
      if (oldIndex === -1) return state
      return state
        .slice(0, oldIndex)
        .concat(state.slice(oldIndex + 1))
    }
    default: {
      return state
    }
  }
}

const chartsReducer = (state, action, io) => ({
  byId: chartsById(state.byId, action, io),
  allIds: allCharts(state.allIds, action),
})

module.exports = chartsReducer
