import { createStore, applyMiddleware } from 'redux'
import { getEstimate, Uber } from './uber'

export const store = createStore(Uber)

export const Actions = {
  getEstimate
}