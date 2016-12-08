import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import cuid from 'cuid'
import checkTickerSymbol from 'check-ticker-symbol'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import { randomTickers } from './tickers'

const styles = {
  topBar: {

  },
  textField: {
    maxWidth: 100,
    margin: 10,
  },
  button: {
    margin: 5,
  },
}

const AddChart = (props) => {
  const { dispatch } = props
  let symbolInput = null

  const onSubmit = (e) => {
    e.preventDefault()
    const symbol = symbolInput.input.value.toUpperCase()
    if (checkTickerSymbol.valid(symbol)) {
      document.getElementById('newSymbol').value = ''
      dispatch({
        type: 'CHARTS_ADD_CHART',
        payload: { chartId: cuid(), symbol, index: 0 },
      })
    }
  }

  return (
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
          style={styles.button}
          label="Add chart to list"
          type="submit"
          // primary
        />
        <RaisedButton
          style={styles.button}
          label="Add random"
          onClick={() => {
            const randomTicker = randomTickers[Math.floor(Math.random() * randomTickers.length)]
            dispatch({
              type: 'CHARTS_ADD_CHART',
              payload: { chartId: cuid(), symbol: randomTicker, index: 0 },
            })
          }}
        />
      </form>
    </div>
  )
}

AddChart.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(AddChart)
