import React, { useEffect } from 'react'

import Authentication from './components/pages/Authentication'
import CreateProject from './components/pages/CreateProject'
import Home from './components/pages/Home'
import { setRouteAction } from './redux/actions/router'
import store from './redux/store'
import { useSelector } from 'react-redux'

const routes = {
  auth: {
    url: '/auth',
    component: <Authentication />,
  },
  home: { url: '/', component: <Home /> },
  create_project: { url: '/create_project', component: <CreateProject /> },
}

var url_to_name = {}

for (let name in routes) {
  url_to_name[routes[name].url] = name
}

export function navigate(route_name, payload = {}) {
  window.history.replaceState({}, route_name, routes[route_name].url)
  store.dispatch(setRouteAction({ name: route_name, ...payload }))
}

function Routes() {
  useEffect(() => {
    navigate(url_to_name[window.location.pathname])
  }, [])
  const routerState = useSelector((state) => state.router)
  return <>{routes[routerState.route.name].component}</>
}

export default Routes
