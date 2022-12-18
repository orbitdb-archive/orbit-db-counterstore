import { GCounter as Counter } from 'crdts'

export defualt class CounterIndex {
  constructor (id) {
    this._index = new Counter(id)
  }

  get () {
    return this._index
  }

  updateIndex (oplog) {
    if (this._index) {
      const getCounter = e => e.payload.value.counters
      const mergeToIndex = _counters => this._index.merge({ _counters })
      oplog.values.filter(e => e && e.payload.op === 'COUNTER')
        .map(getCounter)
        .forEach(mergeToIndex)
    }
  }
}
