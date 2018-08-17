import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { getEstimate, Estimate } from './uber'
import { getCoordinates, Coordinates } from './coordinates'
import { fetchUrl, Chrome } from './chrome'

export const store = createStore(
  combineReducers({
    Estimate,
    Coordinates,
    Chrome
  }),
  applyMiddleware(
    thunk
  )
)

export const Actions = {
  getEstimate,
  getCoordinates,
  fetchUrl
}
