import Config from '../config'

const REQUEST_START = 'request_start'
const REQUEST_SUCCESS = 'request_success'
const REQUEST_ERROR = 'request_error'

const _buildURL = params => {
  const parameterString = '/getEstimate?' + Object.keys(params).reduce((acc, elem) => {
    return acc + `${elem}=${params[elem]}&`
  }, '').slice(0, -1)
  return Config.API_URL + parameterString
}

export const getEstimate = params => {
  return dispatch => {
    const url = _buildURL(params)
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${Config.TOKEN}`
      }
    })
      .then(resp => {
        if (resp.status >= 300) {
          throw new Error('Bad response from API')
        }
        return resp.json()
      })
      .then(data => {
        return dispatch({
          type: REQUEST_SUCCESS,
          data
        })
      })
      .catch(err => {
        return dispatch({
          type: REQUEST_ERROR,
          message: err.message
        })
      })
  }
}

const initialState = {
  error: null,
  prices: []
}

export const Uber = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SUCCESS: {
      return Object.assign({}, {
        error: null,
        prices: action.data.prices
      })
    }
    case REQUEST_ERROR: {
      return Object.assign({}, {
        error: action.message,
        prices: []
      })
    }
    default: return state
  }
}
