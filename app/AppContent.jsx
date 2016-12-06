import React from 'react'

import Index from './Index'

const styles = {
  appContent: {
    maxWidth: 950,
    margin: '0 auto',
  },
}

const AppContent = () => (
  <div style={styles.appContent}>
    <Index />
    <div>
      App Contents
    </div>
  </div>
)

export default AppContent
