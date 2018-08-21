import React from 'react'
import { connect } from 'react-redux'
import { Actions } from '../../store'

import Spinner from '../../components/Spinner'
import ShowEstimate from '../../components/ShowEstimate'

class ShowEstimateContainer extends React.Component {
  componentDidMount() {
    this.props.getAddress()
    this.props.getLocation()
  }

  componentWillReceiveProps(nextProps) {
    console.log('but here thoo')
    if (nextProps.address && !nextProps.addressLocation) {
      console.log('getting coordinates')
      return this.props.getCoordinates(nextProps.address)
    }

    if (nextProps.location && nextProps.addressLocation && !nextProps.prices) {
      console.log('getting estimate')
      const params = {
        start_latitude: nextProps.location.latitude,
        start_longitude: nextProps.location.longitude,
        end_latitude: nextProps.addressLocation.lat,
        end_longitude: nextProps.addressLocation.long
      }
      return this.props.getEstimate(params)
    }
  }

  render() {
    const { address, location } = this.props
    console.log(this.props)

    if (!address || !location) {
      return <Spinner />
    }
    return (
      <ShowEstimate />
    )
  }
}

const mapStateToProps = state => {
  const { Chrome, Coordinates, Uber } = state
  return {
    address: Chrome.address,
    location: Chrome.location,
    addressLocation: Coordinates.coordinates,
    prices: Uber.prices
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAddress: () => {
      dispatch(Actions.getAddress())
    },
    getLocation: () => {
      dispatch(Actions.getLocation())
    },
    getCoordinates: address => {
      dispatch(Actions.getCoordinates(address))
    },
    getEstimate: params => {
      dispatch(Actions.getEstimate(params))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowEstimateContainer)

