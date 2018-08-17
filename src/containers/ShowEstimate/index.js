import React from 'react'
import { connect } from 'react-redux'
import { Actions } from '../../store'

class ShowEstimate extends React.Component {
  render() {
    return (
      <div className='container show-estimate-container'>OK We in business</div>   
    )
  }
}

const mapStateToProps = state => {
  return {
  }
}

const mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEstimate)

