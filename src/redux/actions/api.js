import {
  CODE,
  FETCH_PROJECTS,
  FETCH_USER,
  PROJECT_FORM,
  REGISTRATION,
  TOKEN,
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
  type: PROJECT_FORM,
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
