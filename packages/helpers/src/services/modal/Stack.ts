export class Stack<T> {
  private record: Array<T> = []

  push(item: T) {
    return this.record.push(item)
  }

  pop() {
    return this.record.pop()
  }

  remove(item: T) {
    const index = this.record.findIndex(record => record === item)
    if (index > -1) {
      this.record.splice(index, 1)
    }
  }

  get isEmpty() {
    return this.record.length < 1
  }

  get size() {
    return this.record.length
  }

  get peek() {
    const record = this.record
    const len = record.length
    return len > 0 ? record[len - 1] : null
  }
}
