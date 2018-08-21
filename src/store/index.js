import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { getEstimate, Uber } from './uber'
import { getCoordinates, Coordinates } from './coordinates'
import { fetchUrl, getAddress, getLocation, Chrome } from './chrome'

export const store = createStore(
  combineReducers({
    Uber,
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
  fetchUrl,
  getAddress,
  getLocation
}
