import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom"

import Dashboard from "./pages/Dashboard.jsx"
import Login from "./pages/Login.jsx"

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>

        <Route path="/dashboard">
          <Dashboard />
        </Route>

        <Redirect to="/login" />
      </Switch>
    </Router>
  )
}
