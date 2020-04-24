import {
  CODE,
  CREATE_PROJECT,
  FETCH_PROJECTS,
  FETCH_USER,
  REGISTRATION,
  TOKEN,
  UPDATE_PROJECT,
} from '../constants/api'

export const codeAction = (mobile) => ({
  type: CODE,
  request: {
    url: '/v1/code',
    method: 'POST',
    body: JSON.stringify({ mobile }),
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

export const tokenAction = (mobile, code) => ({
  type: TOKEN,
  request: {
    url: '/v1/token',
    method: 'POST',
    body: JSON.stringify({ mobile, code }),
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

export const registrationAction = (mobile, code, name, role, skills) => ({
  type: REGISTRATION,
  request: {
    url: '/v1/users',
    method: 'POST',
    body: JSON.stringify({ mobile, code, name, role, skills }),
    headers: {
      'Content-Type': 'application/json',
    },
  },
})

export const fetchUserAction = (name) => ({
  type: FETCH_USER,
  request: {
    url: `/v1/users/${name}`,
    method: 'GET',
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
  },
})

export const fetchProjectsAction = (state, skip = 0, limit = 10) => ({
  type: FETCH_PROJECTS,
  request: {
    url: `/v1/projects?state=${state}&skip=${skip}&limit=${limit}`,
    method: 'GET',
  },
})

export const createProjectAction = (title, description, skills) => ({
  type: CREATE_PROJECT,
  request: {
    url: '/v1/projects',
    method: 'POST',
    body: JSON.stringify({ title, description, skills }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('token'),
    },
  },
})

export const updateProjectAction = (_id, description, skills) => ({
  type: UPDATE_PROJECT,
  request: {
    url: '/v1/projects',
    method: 'PATCH',
    body: JSON.stringify({
      action: 'update',
      _id,
      update: { description, skills },
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('token'),
    },
  },
})
