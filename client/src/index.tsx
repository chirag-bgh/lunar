import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { MoralisProvider } from 'react-moralis'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      // Ropsten
      appId='FExkx7Lr9VAGT7hiD9FXYA6BhVfaNQEbISve75C9'
      serverUrl='https://vhm2head6wvb.usemoralis.com:2053/server'

      // Localhost
      // appId='94Z3kVU7K2MSTh3UfwIGOp1iI8akUAvzglgCHcoa'
      // serverUrl='https://tzgfgdv3kgu6.usemoralis.com:2053/server'
    >
      <Router>
        <App />
      </Router>
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
