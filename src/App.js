import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { render } from 'react-dom'
import { store, Actions } from './store'
import './main.scss'

class AppContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      url: 'blooo'
    }
    console.log("hello world")
  }

  componentDidMount() {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, tabs => {
      this.setState({
        url: tabs[0].url
      })
    })


    navigator.geolocation.getCurrentPosition(location => {
      console.log(location)
    })
  }

  render() {
    const { url } = this.state
    if (url.indexOf('facebook') !== -1) {
      return (
        <div>Welcome to facebook</div>
      )
    } else {
      return (
        <div>Must go to facebook</div>
      )
    }
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
