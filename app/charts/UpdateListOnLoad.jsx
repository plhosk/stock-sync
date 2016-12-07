import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class UpdateListOnLoad extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'server/REQUEST_UPDATE' })
  }

  render() {
    return null
  }
}
UpdateListOnLoad.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(UpdateListOnLoad)
