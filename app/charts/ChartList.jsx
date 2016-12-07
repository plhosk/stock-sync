import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import cuid from 'cuid'
import FlatButton from 'material-ui/FlatButton'

const ChartList = (props) => {
  const { charts, chartIds, dispatch } = props
  return (
    <div>
      <FlatButton
        label="Insert Top"
        onClick={() => {
          dispatch({
            type: 'CHARTS_ADD_CHART',
            payload: { chartId: cuid(), symbol: 'FB', index: 0 },
          })
        }}
      />
      <ul>
        {chartIds.map((id, index) => { // eslint-disable-line
          // if (charts[id].hidden) return null
          return (
            <li key={charts[id].id}>
              id: {charts[id].id},
              symbol: {charts[id].symbol},
              loading: {charts[id].loading ? 'true' : 'false'},
              hidden: {charts[id].hidden ? 'true' : 'false'}
              <br />
              <FlatButton
                label="Move Up"
                onClick={() => {
                  dispatch({
                    type: 'CHARTS_MOVE_UP',
                    payload: { chartId: id },
                  })
                }}
              />
              <FlatButton
                label="Move Down"
                onClick={() => {
                  dispatch({
                    type: 'CHARTS_MOVE_DOWN',
                    payload: { chartId: id },
                  })
                }}
              />
              <FlatButton
                label="Change"
                primary
                onClick={() => {
                  dispatch({
                    type: 'CHARTS_SHOW_LOADING_INDICATOR',
                    payload: { chartId: id },
                  })
                }}
              />
              <FlatButton
                label="Hide"
                secondary
                onClick={() => {
                  dispatch({
                    type: 'CHARTS_HIDE_CHART',
                    payload: { chartId: id },
                  })
                }}
              />
              <FlatButton
                label="Insert After"
                onClick={() => {
                  dispatch({
                    type: 'CHARTS_ADD_CHART',
                    payload: { chartId: cuid(), symbol: 'FB', index: index + 1 },
                  })
                }}
              />
            </li>
          )
        })}
      </ul>
    </div>
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
