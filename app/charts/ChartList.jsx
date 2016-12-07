import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import cuid from 'cuid'
import checkTickerSymbol from 'check-ticker-symbol'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import Divider from 'material-ui/Divider'

import UpdateListOnLoad from './UpdateListOnLoad'
import LineChart from './LineChart'

const styles = {
  paper: {
    textAlign: 'center',
  },
  topBar: {

  },
  textField: {
    maxWidth: 100,
    margin: 10,
  },
  heading: {
    paddingTop: 15,
  },
  symbol: {
    fontWeight: 'bold',
    fontSize: '1.5em',
    paddingRight: 30,
  },
  button: {
    margin: '0 5px',
    height: 20,
  },
}

const ChartList = (props) => {
  const { charts, chartIds, dispatch } = props
  let symbolInput = null

  const onSubmit = (e) => {
    e.preventDefault()
    const symbol = symbolInput.input.value
    if (checkTickerSymbol.valid(symbol)) {
      document.getElementById('newSymbol').value = ''
      dispatch({
        type: 'CHARTS_ADD_CHART',
        payload: { chartId: cuid(), symbol, index: 0 },
      })
    }
  }


  return (
    <Paper style={styles.paper}>
      <UpdateListOnLoad />
      <div style={styles.topBar}>

        <form onSubmit={onSubmit}>

          <TextField
            style={styles.textField}
            ref={(newSymbol) => { symbolInput = newSymbol }}
            id="newSymbol"
            type="text"
            placeholder="Symbol"
            // required
            // autofocus
          />

          <RaisedButton
            label="Add Chart"
            type="submit"
          />
        </form>
      </div>
      <div>
        {chartIds.map(id => (
          <div key={charts[id].id}>

            <Divider />

            <div style={styles.heading}>

              <span style={styles.symbol}>
                {charts[id].symbol}
              </span>

              <RaisedButton
                style={styles.button}
                label="Move Up"
                onClick={() => {
                  dispatch({
                    type: 'CHARTS_MOVE_UP',
                    payload: { chartId: id },
                  })
                }}
              />

              <RaisedButton
                style={styles.button}
                label="Move Down"
                onClick={() => {
                  dispatch({
                    type: 'CHARTS_MOVE_DOWN',
                    payload: { chartId: id },
                  })
                }}
              />

              <RaisedButton
                style={styles.button}
                label="Delete"
                onClick={() => {
                  dispatch({
                    type: 'CHARTS_HIDE_CHART',
                    payload: { chartId: id },
                  })
                }}
              />

            </div>

            <LineChart
              symbol={charts[id].symbol}
              prices={charts[id].prices}
              loading={charts[id].loading}
            />

          </div>
        ))}
      </div>
    </Paper>
  )
}

ChartList.propTypes = {
  charts: PropTypes.objectOf(PropTypes.object).isRequired,
  chartIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  charts: state.charts.byId,
  chartIds: state.charts.allIds,
})

export default connect(mapStateToProps)(ChartList)
