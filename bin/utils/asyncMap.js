export class AsyncMap {
  constructor(callback) {
    this.callback = callback
  }

  async map(iterable) {
    let count = 0
    for (let item of iterable) {
      await this.callback(item, count++, iterable)
    }
  }
}

AsyncMap.of = callback => new AsyncMap(callback)
