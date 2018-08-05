import { createStore, applyMiddleware, combineReducers } from 'redux'
import { getEstimate, Estimate } from './uber'
import { getCoordinates, Coordinates } from './coordinates'

export const store = createStore(combineReducers({
  Estimate,
  Coordinates
}))

export const Actions = {
  getEstimate,
  getCoordinates
}
