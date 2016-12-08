import React, { PropTypes } from 'react'
import { Line } from 'react-chartjs-2'
import CircularProgress from 'material-ui/CircularProgress'

import colors from './colors'

class LineChart extends React.PureComponent { // eslint-disable-line
  render() {
    const { symbol, prices, loading } = this.props

    const styles = {
      div: {
        maxWidth: 1000,
        height: 150,
        paddingBottom: 3,
        margin: '0 auto',
      },
      loadingDiv: {
        textAlign: 'center',
        maxWidth: 700,
        height: 100,
        margin: '0 auto',
        padding: 25,
      },
    }

    if (loading) {
      return (
        <div style={styles.loadingDiv}>
          <CircularProgress size={60} thickness={7} /><br />
          Loading...
        </div>
      )
    }

    if (prices.length === 0) {
      return (
        <div style={styles.loadingDiv}>
          <br /><br />
          Data unavailable
        </div>
      )
    }

    const data = {}
    data.labels = prices.map(row => Date.parse(row[0]))
    const values = prices.map(row => row[1])
    const color = colors[Math.floor(Math.random() * colors.length)]
    data.datasets = []
    data.datasets.push({
      data: values,
      label: symbol,
      fill: true,
      pointRadius: 0,
      pointHitRadius: 30,
      borderColor: color,
      backgroundColor: color,
    })

    return (
      <div style={styles.div}>
        <Line
          data={data}
          options={{
            legend: { display: false },
            maintainAspectRatio: false,
            tooltips: {
              mode: 'label',
              callbacks: {
                title: (tooltipItems, datas) => (
                  new Date(datas.labels[tooltipItems[0].index])
                  .toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                ),
                label: (tooltipItems, datas) => (
                  `$${datas.datasets[0].data[tooltipItems.index]}`
                ),
              },
            },
            scales: {
              yAxes: [{
                gridLines: { drawOnChartArea: false },
              }],
              xAxes: [{
                display: false,
                ticks: {
                  callback: value => (
                    new Date(value).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                  ),
                },
                type: 'time',
                time: {
                  unit: 'month',
                },
              }],
            },
          }}
        />
      </div>
    )
  }
}

LineChart.propTypes = {
  symbol: PropTypes.string.isRequired,
  prices: PropTypes.arrayOf(PropTypes.array),
  loading: PropTypes.bool.isRequired,
}

export default LineChart
