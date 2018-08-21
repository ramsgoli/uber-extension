const FETCH_URL = 'FETCH_URL'
const FETCH_ADDRESS = 'FETCH_ADDRESS'
const FETCH_LOCATION = 'FETCH_LOCATION'

const query = { active: true, currentWindow: true };

export const fetchUrl = () => {
  return dispatch => {
    chrome.tabs.query(query, tabs => {
      const url = tabs[0].url
      return dispatch({
        type: FETCH_URL,
        url
      })
    })
  }
}

export const getAddress = () => {
  return dispatch => {
    chrome.tabs.query(query, tabs => {
      chrome.tabs.sendMessage(tabs[0].id, {type: 'getAddress'}, address => {
        return dispatch({
          type: FETCH_ADDRESS,
          address: address.address
        })
      })
    })
  }
}

export const getLocation = () => {
  return dispatch => {
    navigator.geolocation.getCurrentPosition(position => {
      return dispatch({
        type: FETCH_LOCATION,
        location: {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        }
      })
    })
  }
}

const initialState = {
  gotUrl: false,
  url: null,
  address: null,
  location: null
}

export const Chrome = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_URL: {
      return Object.assign({}, {
        gotUrl: true,
        url: action.url
      })
    }
    case FETCH_ADDRESS: {
      return Object.assign({}, state, {
        address: action.address
      })
    }
    case FETCH_LOCATION: {
      return Object.assign({}, state, {
        location: action.location
      })
    }
    default: return state
  }
}
