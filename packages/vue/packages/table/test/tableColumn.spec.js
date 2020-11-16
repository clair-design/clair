import TheadGroupColumn from './columnTableTest'
import { mount } from '@vue/test-utils'

const DELAY = 1000
const originalConsoleError = console.error
beforeAll(() => {
  console.error = () => void 0
})

afterAll(() => {
  console.error = originalConsoleError
})

describe('[table] thead group width c-table-column', () => {
  test('c-table-column with thead group', done => {
    const wrapper = mount(TheadGroupColumn)
    const theadCols = 1
    setTimeout(() => {
      expect(wrapper.findAll('th[colspan="2"]')).toHaveLength(theadCols)
      expect(wrapper.contains('.customTypeThead')).toBeTruthy()
      expect(wrapper.contains('.c-table__cell--sticky')).toBeTruthy()
      expect(wrapper.text()).toContain('~~2~~')
      expect(wrapper.text()).toContain('custom thead')
      expect(wrapper.contains('.TEST')).toBeTruthy()
      expect(wrapper).toMatchSnapshot()
      done()
    }, DELAY)
  })
})
