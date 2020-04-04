import React from "react"
import Root from "./App/Root"
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:id?">
          <Root />
        </Route>
      </Switch>
    </Router>
  )
}

export default App
