import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Redbox from 'redbox-react' // Remove in production build

import store from './store'
import AppContent from './AppContent'

injectTapEventPlugin()


const RedboxWithConsole = ({ error }) => {
  console.error(error) // eslint-disable-line
  return <Redbox error={error} />
}
RedboxWithConsole.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired,
}

const rootElement = document.getElementById('app')

let errorReporter
if (process.env.NODE_ENV === 'production') {
  errorReporter = null
} else {
  errorReporter = RedboxWithConsole
}
const renderApp = reporter => render(
  <AppContainer errorReporter={reporter}>
    <Provider store={store}>
      <MuiThemeProvider>
        <AppContent />
      </MuiThemeProvider>
    </Provider>
  </AppContainer>,
  rootElement,
)

renderApp(errorReporter)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./AppContent', () => {
    renderApp(errorReporter)
  })
}
