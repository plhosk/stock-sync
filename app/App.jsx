import { AppContainer } from 'react-hot-loader'
import { render } from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import Redbox from 'redbox-react' // Remove in production build

import store from './store'
import reducer from './reducer'
import AppContent from './AppContent'

injectTapEventPlugin()


const RedboxWithConsole = ({ error }) => {
  console.error(error) // eslint-disable-line
  return <Redbox error={error} />
}
RedboxWithConsole.propTypes = {
  error: React.PropTypes.instanceOf(Error).isRequired,
}

const rootEl = document.getElementById('app')

render(
  <AppContainer errorReporter={RedboxWithConsole}>
    <Provider store={store}>
      <MuiThemeProvider>
        <AppContent />
      </MuiThemeProvider>
    </Provider>
  </AppContainer>,
  rootEl,
)

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./reducer', () => {
    store.replaceReducer(reducer)
  })

  module.hot.accept('./AppContent', () => {
    render(
      <AppContainer errorReporter={RedboxWithConsole}>
        <Provider store={store}>
          <MuiThemeProvider>
            <AppContent />
          </MuiThemeProvider>
        </Provider>
      </AppContainer>,
      rootEl,
    )
  })
}
