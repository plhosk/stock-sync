import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import Divider from 'material-ui/Divider'
import NavigationArrowUpward from 'material-ui/svg-icons/navigation/arrow-upward'
import NavigationArrowDownward from 'material-ui/svg-icons/navigation/arrow-downward'
import NavigationCancel from 'material-ui/svg-icons/navigation/cancel'
import { blue500, red500 } from 'material-ui/styles/colors'

import UpdateListOnLoad from './UpdateListOnLoad'
import AddChart from './AddChart'
import LineChart from './LineChart'

import { tickerSymbols, tickerNames } from './tickers'

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
    paddingTop: 10,
    paddingLeft: 40,
    paddingRight: 40,
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'space-between',
  },
  titleDiv: {
  },
  buttonDiv: {

  },
  symbol: {
    fontWeight: 'bold',
    fontSize: '1.5em',
    paddingRight: 10,
  },
  name: {
    fontSize: '0.8em',
  },
  button: {
    margin: '0 1px',
    height: 20,
    marginTop: 5,
  },
  buttonIcon: {
    height: 16,
    width: 16,
    position: 'relative',
    top: '-1px',

  },
  buttonMoveText: {
    color: blue500,
  },
  buttonDelText: {
    color: red500,
  },
}

const ChartList = (props) => {
  const { charts, chartIds, dispatch } = props

  return (
    <Paper zDepth={2} style={styles.paper}>
      <UpdateListOnLoad />
      <AddChart />
      <div>
        {chartIds.map((id) => {
          if (charts[id].hidden) return null
          return (
            <div key={charts[id].id}>

              <Divider style={{ padding: '0.5px 0' }} />

              <div style={styles.heading}>
                <div style={styles.titleDiv}>
                  <span style={styles.symbol}>
                    {charts[id].symbol}
                  </span>
                  <span style={styles.name}>
                    {tickerSymbols.indexOf(charts[id].symbol) >= 0 && (
                      tickerNames[tickerSymbols.indexOf(charts[id].symbol)]
                    )}
                  </span>
                </div>
                <div style={styles.buttonDiv}>
                  <RaisedButton
                    style={styles.button}
                    icon={<NavigationArrowUpward style={styles.buttonIcon} color={blue500} />}
                    labelPosition="after"
                    label={<span style={styles.buttonMoveText}>Up</span>}
                    onClick={() => {
                      dispatch({
                        type: 'CHARTS_MOVE_UP',
                        payload: { chartId: id },
                      })
                    }}
                  />

                  <RaisedButton
                    style={styles.button}
                    icon={<NavigationArrowDownward style={styles.buttonIcon} color={blue500} />}
                    labelPosition="after"
                    label={<span style={styles.buttonMoveText}>Down</span>}
                    onClick={() => {
                      dispatch({
                        type: 'CHARTS_MOVE_DOWN',
                        payload: { chartId: id },
                      })
                    }}
                  />

                  <RaisedButton
                    style={styles.button}
                    icon={<NavigationCancel style={styles.buttonIcon} color={red500} />}
                    labelPosition="after"
                    label={<span style={styles.buttonDelText}>Del</span>}
                    onClick={() => {
                      dispatch({
                        type: 'CHARTS_HIDE_CHART',
                        payload: { chartId: id },
                      })
                    }}
                  />
                </div>
              </div>

              <LineChart
                symbol={charts[id].symbol}
                prices={charts[id].prices}
                loading={charts[id].loading}
              />

            </div>
          )
        })}
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
