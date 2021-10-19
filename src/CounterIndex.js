'use strict'

const Counter = require('crdts/src/G-Counter')

class CounterIndex {
  constructor (id) {
    this._index = new Counter(id)
  }

  get () {
    return this._index
  }

  updateIndex (oplog) {
    if (this._index) {
      const mergeWith = (counter, otherCounters) => {
        // Go through each counter in the other counter
        Object.entries(otherCounters).forEach(([id, value]) => {
          // Take the maximum of the counter value we have or the counter value they have
          counter._counters[id] = Math.max(counter._counters[id] || 0, value)
        })
      }
      const getCounter = e => e.payload.value.counters
      const mergeToIndex = e => mergeWith(this._index, e)
      oplog.values.filter(e => e && e.payload.op === 'COUNTER')
        .map(getCounter)
        .forEach(mergeToIndex)
    }
  }
}

module.exports = CounterIndex
