import { CODE } from '../constants'
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
