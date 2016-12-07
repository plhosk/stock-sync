import React from 'react'
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up'
import { green500 } from 'material-ui/styles/colors'

const styles = {
  outerDiv: {
    fontSize: '1.1em',
    lineHeight: '1.6em',
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
    marginTop: 30,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: '1.1em',
  },
}

const Index = () => (
  <div style={styles.outerDiv}>
    <h2 style={styles.title}>
      <ActionTrendingUp style={styles.logo} color={green500} />
      Stock Sync
    </h2>
    <ul>
      <li>Enter a stock market symbol to create a chart.</li>
      <li>Add, move or delete charts in the list.</li>
      <li>
        Any changes you make are instantly synchronized
        with anyone else who is using the app.
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
      Enter a stock symbol (i.e., AAPL, AMZN, FB, GOOG, MSFT)
    </div>
  </div>
)

export default Index
