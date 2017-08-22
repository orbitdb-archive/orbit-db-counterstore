'use strict'

const Counter = require('crdts/src/G-Counter')

class CounterIndex {
  constructor(id) {
    this._index = new Counter(id)
  }

  get() {
    return this._index
  }

  updateIndex(oplog) {
    if(this._index) {
      oplog.values.filter((f) => f && f.payload.op === 'COUNTER')
        .map((f) => Counter.from(f.payload.value))
        .forEach((f) => this._index.merge(f))
    }
  }
}

module.exports = CounterIndex
