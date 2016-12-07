import React from 'react'

import Index from './Index'
import ChartList from './charts/ChartList'

const styles = {
  appContent: {
    maxWidth: 950,
    margin: '0 auto',
  },
}

const AppContent = () => (
  <div style={styles.appContent}>
    <Index />
    <ChartList />
  </div>
)

export default AppContent
