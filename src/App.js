import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { render } from 'react-dom'
import { store, Actions } from './store'

import Spinner from './components/Spinner'
import Null from './containers/Null'
import ShowEstimate from './containers/ShowEstimate'
import './main.scss'

class AppContainer extends Component {
  componentDidMount() {
    this.props.fetchUrl()
  }

  render() {
    const { gotUrl, url } = this.props

    if (!gotUrl) {
      return <Spinner />
    }

    const isFacebookEvent = /https:\/\/www.facebook.com\/events\/[0-9]+/.test(url)
    return isFacebookEvent ? <ShowEstimate /> : <Null />
  }
}

const mapStateToProps = state => {
  const { Chrome } = state
  return {...Chrome}
}

const mapDispatchToProps = dispatch => ({
  fetchUrl: () => {
    dispatch(Actions.fetchUrl())
  }
})

AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppContainer)

render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('mount')
)
