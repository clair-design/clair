/**
 * 自增 ID 计数器
 */
export class AutoIncreasingCounter {
  private val: number
  private step: number

  constructor(initialNumber: number = 0, step: number = 1) {
    this.val = initialNumber || 0
    this.step = step
  }

  /**
   * Gets the next value
   */
  next() {
    this.val += this.step
    return this.val
  }
}
