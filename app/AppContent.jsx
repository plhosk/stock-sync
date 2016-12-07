import React from 'react'

import Index from './Index'
import ChartList from './charts/ChartList'

const styles = {
  appContent: {
    maxWidth: 800,
    margin: '0 auto',
    paddingBottom: 30,
  },
}

const AppContent = () => (
  <div style={styles.appContent}>
    <Index />
    <ChartList />
  </div>
)

export default AppContent
