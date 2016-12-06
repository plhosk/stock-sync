import React from 'react'
import ActionTrendingUp from 'material-ui/svg-icons/action/trending-up'
import { green500 } from 'material-ui/styles/colors'

const styles = {
  outerDiv: {
    padding: '10px 0',
    lineHeight: '1.3em',
  },
  logo: {
    height: 48,
    width: 48,
    position: 'relative',
    top: 16,
    padding: 4,
  },
  title: {
    color: green500,
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
      <li>Set chart options such as time scale and chart style.</li>
      <li>
        Changes to chart settings (which charts are visible, individual chart options)
        will be synchronized in real-time to anyone else who is using the app.
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
  </div>
)

export default Index
