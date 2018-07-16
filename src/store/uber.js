import Config from '../config'

const REQUEST_START = 'request_start'
const REQUEST_SUCCESS = 'request_success'
const REQUEST_ERROR = 'request_error'

const _buildURL = params => {
  const parameterString = '?' + Object.keys(params).reduce((acc, elem) => {
    return acc + `${elem}=${params[elem]}=`
  }, '').slice(0, -1)
  return Config.API_URL + parameterString
}

export const getEstimate = params => {
  return async dispatch => {
    const url = _buildURL(params)
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${Config.TOKEN}`
        }
      })

      const status = await response.status
      if (status >= 300) {
        throw new Error('Bad response from API')
      }

      const data = await response.json()
      return dispatch({
        type: REQUEST_SUCCESS,
        data
      })
    } catch (err) {
      return dispatch({
        type: REQUEST_ERROR,
        message: err.message
      })
    }
  }
}

const initialState = {
  error: null,
  prices: []
}

export const Uber = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SUCCESS: {
      return {
        error: null,
        prices: action.data.prices
      }
    }
    case REQUEST_ERROR: {
      return {
        error: action.message
      }
    }
    default: return state
  }
}