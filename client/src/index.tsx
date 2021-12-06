import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { MoralisProvider } from "react-moralis";

ReactDOM.render(
  <React.StrictMode>
    <MoralisProvider
      appId="94Z3kVU7K2MSTh3UfwIGOp1iI8akUAvzglgCHcoa"
      serverUrl="https://tzgfgdv3kgu6.usemoralis.com:2053/server"
    >
      <App />
    </MoralisProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
