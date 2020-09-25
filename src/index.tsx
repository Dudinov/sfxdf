import '@babel/polyfill/noConflict'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router5'
import createRouter from './router'
import createStore from './store'
import App from './App'
import './assets/sass/index.scss'

const router = createRouter()
const store = createStore(router)
const rootEl = document.getElementById('root')

router.start(() => {
  ReactDOM.render((
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  ), rootEl)
})
