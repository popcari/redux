import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { store } from "./store/index"
import "./App.css"

import App from "./App"
import Spinner from "./component/Spinner.jsx"

ReactDOM.render(
  <Provider store={store}>
    <Spinner />
    <App />
  </Provider>,
  document.getElementById("root"),
)
