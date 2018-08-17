import React from 'react'
import { connect } from 'react-redux'
import { Actions } from '../../store'

import ShowEstimate from '../../components/ShowEstimate'

class ShowEstimateContainer extends React.Component {
  componentDidMount() {
    this.props.getAddress()
  }
  render() {
    console.log(this.props)
    return (
      <ShowEstimate />
    )
  }
}

const mapStateToProps = state => {
  const { Chrome } = state
  return {
    ...Chrome
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAddress: () => {
      dispatch(Actions.getAddress())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEstimateContainer)

