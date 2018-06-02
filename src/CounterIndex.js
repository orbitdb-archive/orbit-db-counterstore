'use strict'

const Counter = require('crdts').PNCounter

class CounterIndex {
  constructor(id) {
    this._index = new Counter(id)
  }

  get() {
    return this._index
  }

  updateIndex(oplog) {
    if(this._index) {
      const createCounter = e => Counter.from(e.payload.value)
      const mergeToIndex = e => {
        const other = new PNCounter(e.uid,
          new GCounter(e.uid, e.p.counters),
          new GCounter(e.uid, e.n.counters))
        return this._index.merge(other)
      }
      oplog.values.filter(e => e && e.payload.op === 'COUNTER')
        .map(createCounter)
        .forEach(mergeToIndex)
    }
  }
}

module.exports = CounterIndex
