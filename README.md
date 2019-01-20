# orbit-db-counterstore

[![npm version](https://badge.fury.io/js/orbit-db-counterstore.svg)](https://badge.fury.io/js/orbit-db-counterstore)

> Counters database for OrbitDB

A simple counters database. Useful for example counting events separate from data.

Used in [orbit-db](https://github.com/haadcode/orbit-db).

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [API](#api)
- [Contributing](#contributing)
- [License](#license)

## Install

This project uses [npm](https://npmjs.com) and [nodejs](https://nodejs.org)

```
npm install orbit-db ipfs
```

## Usage

First, create an instance of OrbitDB:

```javascript
const IPFS = require('ipfs')
const OrbitDB = require('orbit-db')

const ipfs = new IPFS()
const orbitdb = new OrbitDB(ipfs)
```

Get a log database and add an entry to it:

```javascript
const counter = orbitdb.counter('visitors')
counter.inc()
console.log(counter.value)
// 1
counter.inc(4)
console.log(counter.value)
// 5
```

Later, when the database contains data, load the history and query when ready:

```javascript
const counter = orbitdb.counter('visitors')
counter.events.on('ready', () => {
  counter.inc()
  console.log(counter.value)
  // 6
})
```

See [example/index.html](https://github.com/haadcode/orbit-db-counterstore/blob/master/example/index.html) for a detailed example. Note that to run this example, you need to have a local [IPFS daemon](https://dist.ipfs.io/go-ipfs/floodsub-2) [running](https://ipfs.io/docs/getting-started/) at port 5001.

## API

See [orbit-db's API Documenations](https://github.com/haadcode/orbit-db/blob/master/API.md#countername) for full details.

## Contributing

If you think this could be better, please [open an issue](https://github.com/orbitdb/repo-template/issues/new)!

Please note that all interactions in @orbitdb fall under our [Code of Conduct](CODE_OF_CONDUCT.md).

## License

[MIT](LICENSE) © 2016-2018 Protocol Labs Inc., Haja Networks Oy
