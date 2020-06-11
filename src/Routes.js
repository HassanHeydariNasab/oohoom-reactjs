import React, { useEffect } from 'react'

import Authentication from './components/pages/Authentication'
import Home from './components/pages/Home'
import Project from './components/pages/Project'
import ProjectForm from './components/pages/ProjectForm'
import { setRouteAction } from './redux/actions/router'
import store from './redux/store'
import { useSelector } from 'react-redux'

const routes = {
  empty: { url_regex: /\/empty\//, component: (params) => <React.Fragment /> },
  not_found: {
    url_regex: /^\/404\//,
    component: (params) => <div>Not Found!</div>,
  },
  auth: {
    url_regex: /^\/auth\/\?back_url=(?<back_url>.*)/,
    component: (props) => <Authentication {...props} />,
  },
  project_form: {
    url_regex: /^\/project-form\/\?back_url=(?<back_url>.*)/,
    component: (props) => <ProjectForm {...props} />,
  },
  project: {
    url_regex: /^\/projects\/(?<project_title>.*)\//,
    component: (props) => <Project {...props} />,
  },
  home: { url_regex: /^\/$/, component: (props) => <Home {...props} /> },
  not_matched: { url_regex: /.*/, component: (props) => <div>Not Found!</div> },
}

export function navigate(url) {
  const [name, props] = processed_url(url)
  window.history.replaceState({}, name, url)
  store.dispatch(setRouteAction({ name, props }))
}

function processed_url(url) {
  let route_name = 'not_found'
  let route_props = {}
  for (let name in routes) {
    let match_result = url.match(routes[name].url_regex)
    if (match_result) {
      route_name = name
      route_props = match_result.groups
      break
    }
  }
  console.log('route matched', route_name, route_props)
  return [route_name, route_props]
}

function Routes({ t }) {
  useEffect(() => {
    navigate(window.location.pathname + window.location.search)
  }, [])

  const routerState = useSelector((state) => state.router)
  return (
    <>
      {routes[routerState.route.name].component({
        ...routerState.route.props,
        t,
      })}
    </>
  )
}

export default Routes
