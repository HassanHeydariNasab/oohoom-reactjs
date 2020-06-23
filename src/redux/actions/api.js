import {
  CODE,
  CREATE_PROJECT,
  FETCH_PROJECT,
  FETCH_PROJECTS,
  FETCH_USER,
  REGISTRATION,
  TOKEN,
  UPDATE_PROJECT,
  ASSIGN_PROJECT,
  FETCH_INPUT_FILES,
  FETCH_OUTPUT_FILES,
  CREATE_FILE,
  CLEAR_OUTPUT_FILES,
  FETCH_MESSAGES,
  CREATE_MESSAGE,
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

export const fetchProjectAction = (project_id) => ({
  type: FETCH_PROJECT,
  request: {
    url: `/v1/projects/${project_id}`,
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

export const assignProjectAction = (_id) => ({
  type: ASSIGN_PROJECT,
  request: {
    url: '/v1/projects',
    method: 'PATCH',
    body: JSON.stringify({
      action: 'assign',
      _id,
    }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('token'),
    },
  },
})

export const fetchInputFilesAction = (project_id) => ({
  type: FETCH_INPUT_FILES,
  request: {
    url: `/v1/files?project_id=${project_id}&kind=input`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('token'),
    },
  },
})

export const fetchOutputFilesAction = (project_id) => ({
  type: FETCH_OUTPUT_FILES,
  request: {
    url: `/v1/files?project_id=${project_id}&kind=output`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('token'),
    },
  },
})

export const createFileAction = (data) => ({
  type: CREATE_FILE,
  request: {
    url: '/v1/files',
    method: 'POST',
    body: data,
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
  },
})

export const clearOutputFilesAction = () => ({
  type: CLEAR_OUTPUT_FILES,
  payload: {},
})

export const fetchMessagesAction = (project_id) => ({
  type: FETCH_MESSAGES,
  request: {
    url: `/v1/messages?project_id=${project_id}`,
    method: 'GET',
    headers: {
      Authorization: window.localStorage.getItem('token'),
    },
  },
})

export const createMessageAction = (message) => ({
  type: CREATE_MESSAGE,
  request: {
    url: '/v1/messages',
    method: 'POST',
    body: JSON.stringify(message),
    headers: {
      'Content-Type': 'application/json',
      Authorization: window.localStorage.getItem('token'),
    },
  },
})
