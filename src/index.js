import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './components/app/app'
// import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min'
import './index.scss'
import { Provider } from 'react-redux'
import store from './redux/store'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)
