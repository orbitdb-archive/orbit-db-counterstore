'use strict'

const Counter = require('crdts/src/G-Counter')

class CounterIndex {
  constructor(id) {
    this._counter = new Counter(id)
  }

  get() {
    return this._counter
  }

  updateIndex(oplog, added) {
    if(this._counter) {
      added.filter((f) => f && f.payload.op === 'COUNTER')
        .map((f) => Counter.from(f.payload.value))
        .forEach((f) => this._counter.merge(f))
    }
  }
}

module.exports = CounterIndex
