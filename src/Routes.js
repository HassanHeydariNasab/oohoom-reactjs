import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Authentication from './components/pages/Authentication'

function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Authentication />
        </Route>
      </Switch>
    </Router>
  )
}

export default Routes
