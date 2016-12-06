import ReactDOM from 'react-dom'
import React from 'react'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import store from './store'
import AppContent from './AppContent'

injectTapEventPlugin()


const App = () => (
  <MuiThemeProvider>
    <AppContent />
  </MuiThemeProvider>
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app'),
)
