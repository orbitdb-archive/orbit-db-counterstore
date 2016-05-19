'use strict';

const Store        = require('orbit-db-store');
const CounterIndex = require('./CounterIndex');

class CounterStore extends Store {
  constructor(ipfs, id, dbname, options) {
    if(!options) options = {};
    if(!options.Index) Object.assign(options, { Index: CounterIndex });
    super(ipfs, id, dbname, options)
  }

  value() {
    return this._index.get().value;
  }

  inc(amount) {
    const counter = this._index.get();
    if(counter) {
      counter.increment(amount);
      return this._addOperation({
        op: 'COUNTER',
        key: null,
        value: counter.payload,
        meta: {
          ts: new Date().getTime()
        }
      });
    }
  }
}

module.exports = CounterStore;
