import React from 'react'
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up'
import { green500 } from 'material-ui/styles/colors'

const styles = {
  outerDiv: {
    fontSize: '1.1em',
    lineHeight: '1.8em',
    padding: '0 10px',
  },
  logo: {
    height: 60,
    width: 60,
    position: 'relative',
    top: 16,
    padding: 4,
  },
  title: {
    color: green500,
    fontSize: '2em',
  },
  instructions: {
    color: green500,
    marginTop: 10,
    textAlign: 'center',
    fontSize: '1.1em',
  },
  quandl: {
    textAlign: 'right',
    fontSize: '0.6em',
    padding: 0,
    margin: 0,
    marginBottom: 5,
    lineHeight: '0.6em',
  },
}

const Index = () => (
  <div style={styles.outerDiv}>
    <h2 style={styles.title}>
      <ActionTrendingUp style={styles.logo} color={green500} />
      Stock Sync
    </h2>
    <ul>
      <li>
        <strong>Enter a ticker symbol</strong> to see stock price over time
        (from January 2016 to present).
      </li>
      <li>
        <strong>Add</strong>, <strong>move</strong> or <strong>delete</strong> charts
        in the list. You can add as many charts as you like.
      </li>
      <li>
        Any changes you make are <strong>instantly synchronized</strong> with
        anyone else who is using the app.
      </li>
      <li>
        Try opening the app on multiple browsers or devices
        and watch the changes synchronize.
      </li>
      <li>
        Check out this app&rsquo;s source code on <a
          href="https://github.com/plhosk/stock-sync"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>.
      </li>
    </ul>
    <div style={styles.instructions}>
      Enter a stock symbol (e.g., AAPL, AMZN, FB, GOOG, MSFT)
    </div>
    <div style={styles.quandl}>
      Data source: Quandl API
    </div>
  </div>
)

export default Index
