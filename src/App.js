import React, { Component } from 'react'
import { render } from 'react-dom'

class App extends Component {
  constructor(props) {
    super(props)
    navigator.geolocation.getCurrentPosition(location => {
      console.log(location)
    })

    this.state = {
      url: 'blooo'
    }
  }

  componentDidMount() {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, tabs => {
      this.setState({
        url: tabs[0].url
      })
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

render(
  <App />,
  document.getElementById('mount')
)