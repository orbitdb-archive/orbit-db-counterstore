'use strict'

const Store = require('orbit-db-store')
const CounterIndex = require('./CounterIndex')
const Counter = require('crdts').PNCounter

class CounterStore extends Store {
  constructor(ipfs, id, dbname, options = {}) {
    if(!options.Index) Object.assign(options, { Index: CounterIndex })
    super(ipfs, id, dbname, options)
    this._type = 'counter'
  }

  get value() {
    return this._index.get().value
  }

  inc(amount) {
    const counter = new PNCounter(this.uid,
      new GCounter(this.uid, this._index.get().p._counters),
      new GCounter(this.uid, this._index.get().n._counters))
    counter.increment(amount)
    return this._addOperation({
      op: 'COUNTER',
      key: null,
      value: counter.toJSON(),
    })
  }

  dec(amount) {
    const counter = new PNCounter(this.uid,
      new GCounter(this.uid, this._index.get().p._counters),
      new GCounter(this.uid, this._index.get().n._counters))
    counter.decrement(amount)
    return this._addOperation({
      op: 'COUNTER',
      key: null,
      value: counter.toJSON(),
    })
  }
}

module.exports = CounterStore
