import React, { useEffect } from 'react'

import Authentication from './components/pages/Authentication'
import Home from './components/pages/Home'
import ProjectForm from './components/pages/ProjectForm'
import { setRouteAction } from './redux/actions/router'
import store from './redux/store'
import { useSelector } from 'react-redux'

const routes = {
  empty: { url: '/empty', component: <React.Fragment /> },
  not_found: { url: '/404', component: <div>Not Found!</div> },
  auth: {
    url: '/auth',
    component: <Authentication />,
  },
  home: { url: '/', component: <Home /> },
  project_form: { url: '/project', component: <ProjectForm /> },
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
    navigate(url_to_name[window.location.pathname] || 'not_found')
  }, [])
  const routerState = useSelector((state) => state.router)
  return <>{routes[routerState.route.name].component}</>
}

export default Routes
