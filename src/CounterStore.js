import Store from 'orbit-db-store'
import CounterIndex from './CounterIndex.js'
import { GCounter as Counter } from 'crdts'

export default class CounterStore extends Store {
  constructor (ipfs, id, dbname, options = {}) {
    if (!options.Index) {
      Object.assign(options, { Index: CounterIndex })
    }
    super(ipfs, id, dbname, options)
    this._index = new this.options.Index(this.identity.publicKey)
    this._type = 'counter'
  }

  get value () {
    return this._index.get().value
  }

  inc (amount, options = {}) {
    const counter = new Counter(this.identity.publicKey, Object.assign({}, this._index.get()._counters))
    counter.increment(amount)
    return this._addOperation({
      op: 'COUNTER',
      key: null,
      value: counter.toJSON()
    }, options)
  }
}
