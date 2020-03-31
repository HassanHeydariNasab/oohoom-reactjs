import { CODE, TOKEN } from '../constants/api'
export const codeAction = mobile => ({
  type: CODE,
  request: {
    url: '/v1/code',
    method: 'POST',
    body: JSON.stringify({ mobile }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
})

export const tokenAction = (mobile, code) => ({
  type: TOKEN,
  request: {
    url: '/v1/token',
    method: 'POST',
    body: JSON.stringify({ mobile, code }),
    headers: {
      'Content-Type': 'application/json'
    }
  }
})
