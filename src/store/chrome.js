const FETCH_URL = 'FETCH_URL'

export const fetchUrl = () => {
  return dispatch => {
    const query = { active: true, currentWindow: true };
    chrome.tabs.query(query, tabs => {
      const url = tabs[0].url
      return dispatch({
        type: FETCH_URL,
        url
      })
    })
  }
}

const initialState = {
  gotUrl: false,
  url: null
}

export const Chrome = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_URL: {
      return Object.assign({}, {
        gotUrl: true,
        url: action.url
      })
    }
    default: return state
  }
}
