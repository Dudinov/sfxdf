import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux'
import { router5Middleware, router5Reducer } from 'redux-router5'
import thunk from 'redux-thunk'
import reducers from './reducers'

export default function configureStore (router: any, initialState = {}) {
  const middlewares = [
    router5Middleware(router),
    thunk
  ]

  if (process.env.NODE_ENV === 'development') {
    const { logger } = require('redux-logger')

    middlewares.push(logger)
  }

  const createStoreWithMiddleware = compose(applyMiddleware(...middlewares))(createStore)
  const store = createStoreWithMiddleware(
    combineReducers({
      router: router5Reducer,
      app: reducers
    }),
    initialState
  )

  return store
}
