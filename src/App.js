import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { render } from 'react-dom'
import { store, Actions } from './store'

import Spinner from './components/Spinner'
import Null from './containers/Null'
import './main.scss'

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: '',
      gotLocation: false,
      isFacebookEvent: false,
      coordinates: {}
    }
  }

  componentDidMount() {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, tabs => {
      const url = tabs[0].url
      const isFacebookEvent = /https:\/\/www.facebook.com\/events\/[0-9]+/.test(url)
      this.setState({
        url,
        gotLocation: true,
        isFacebookEvent
      })
    })
  }

  render() {
    const { gotLocation, isFacebookEvent } = this.state

    if (gotLocation && !isFacebookEvent) {
      return <Null />
    }

    return (
      <Spinner />
    )
  }
}

const mapStateToProps = state => ({
  errors: state.error,
  prices: state.prices
})

const mapDispatchToProps = dispatch => ({
  getEstimate: (params) => {
    return dispatch(Actions.getEstimate(params))
  }
})

AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer)

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('mount')
)
