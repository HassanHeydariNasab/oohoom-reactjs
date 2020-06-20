import { all, take } from 'redux-saga/effects'

export default function* takeAll(types = [], f) {
  while (true) {
    var _types = []
    for (let type_ of types) {
      _types.push(take(type_))
    }
    var actions = yield all(_types)
    yield f(actions)
  }
}
