import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import { MoralisProvider } from 'react-moralis'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'

ReactDOM.render(
  // <React.StrictMode>
  <MoralisProvider
    // Polygon Mumbai
    appId={process.env.REACT_APP_APP_ID}
    serverUrl={process.env.REACT_APP_SERVER_URL}
  >
    <Router>
      <App />
    </Router>
  </MoralisProvider>,
  // </React.StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
