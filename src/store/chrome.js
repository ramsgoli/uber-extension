const FETCH_URL = 'FETCH_URL'
const FETCH_ADDRESS = 'FETCH_ADDRESS'
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
          address
        })
      })
    })
  }
}

const initialState = {
  gotUrl: false,
  url: null,
  address: null
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
    default: return state
  }
}
