import Config from '../config'

const REQUEST_START = 'request_start'
const REQUEST_SUCCESS = 'request_success'
const REQUEST_ERROR = 'request_error'

export const getCoordinates = address => {
  return async dispatch => {
    const url = `${Config.API_URL}?address=${address}`
    try {
      const response = await fetch(url, {
        method: 'GET'
      })

      const status = await response.status
      const data = await response.json()
      if (status != 200) {
        throw new Error(response.message)
      }

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
  coordinates: {}
}

export const Coordinates = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_SUCCESS: {
      return Object.assign({}, {
        error: null,
        coordinates: action.data
      })
    }
    case REQUEST_ERROR: {
      return Object.assign({}, {
        error: action.message,
        coordinates: {}
      })
    }
    default: return state
  }
}
