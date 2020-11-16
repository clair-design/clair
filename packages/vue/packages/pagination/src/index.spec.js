import { mount } from '@vue/test-utils'
import Vue from 'vue'
import Pagination from '../src/index'

const DELAY = 500
describe('[pagination] default', () => {
  const wrapper = mount(Pagination, {
    propsData: {
      total: 100
    }
  })
  it('pn default', () => {
    expect(wrapper.vm.pn).toBe(1)
    expect(wrapper.vm.pageNumber).toBe(1)
    expect(wrapper.vm.jumpPage).toBe('')
  })
  it('ps default', () => {
    expect(wrapper.vm.ps).toBe(20)
  })
})
describe('[Pagination]', () => {
  const wrapper = mount(Pagination, {
    propsData: {
      total: 200,
      pn: 1,
      ps: 20
    }
  })
  it('base show', () => {
    expect(wrapper.findAll('.c-pagination__page')).toHaveLength(2 + 1 + 2 * 2)
    expect(wrapper.find('.c-pagination__ellipsis').element).toBeTruthy()
  })

  it('test span', async () => {
    wrapper.setProps({
      pn: 5,
      span: 3
    })
    await Vue.nextTick()
    const len = 2 + 1 + 3 * 2
    expect(wrapper.findAll('.c-pagination__page')).toHaveLength(len)
    expect(wrapper.find('.c-pagination__page--active').text()).toBe('5')
  })

  it('Small size', async () => {
    wrapper.setProps({
      size: 'small'
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-pagination--small').element).toBeTruthy()
  })

  it('layout test', async () => {
    wrapper.setProps({
      layout: 'total,pages,jump'
    })
    await Vue.nextTick()
    expect(wrapper.find('.c-pagination__total').text()).toBe('总共 200 条')
    expect(
      wrapper.find('.c-pagination__total ~ .c-pagination__jump').element
    ).toBeTruthy()
    wrapper.setProps({
      layout: 'jump,total,pages'
    })
    await Vue.nextTick()
    expect(
      wrapper.find('.c-pagination__total ~ .c-pagination__jump').element
    ).toBeFalsy()
  })

  it('parent ps 0, pagecount is 1', async () => {
    wrapper.setProps({
      ps: 0
    })
    await Vue.nextTick()
    expect(wrapper.vm.pageCount).toBe(1)
  })

  test('hide on single page', async () => {
    wrapper.setProps({
      total: 0,
      hideOnSinglePage: true
    })
    await Vue.nextTick()
    expect(wrapper.html()).toBeFalsy()
  })

  test('pn should not exceed page count', async () => {
    wrapper.setProps({
      pn: 10,
      ps: 20,
      total: 10,
      hideOnSinglePage: false
    })
    await Vue.nextTick()
    expect(wrapper.find('[aria-current="true"]').text().includes('1')).toBe(
      true
    )
  })
})

describe('[pagination] Event test', () => {
  it('emitPageChange active click', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 200,
        pn: 9,
        ps: 20
      }
    })
    wrapper.find('.c-pagination__page--active').trigger('click')
    expect(wrapper.emitted()['page-change']).toBeFalsy()
  })
  it('emitPageChange prev click', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 200,
        pn: 4,
        ps: 20
      }
    })
    wrapper.find('.c-pagination__prev').trigger('click')
    expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(3)
  })
  it('emitPageChange next click', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 200,
        pn: 4,
        ps: 20
      }
    })
    wrapper.find('.c-pagination__next').trigger('click')
    expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(5)
  })
  it('first page click', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 200,
        pn: 4,
        ps: 20
      }
    })
    wrapper.find('.c-pagination__page').trigger('click')
    expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(1)
  })
  it('jump input change', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 200,
        pn: 4,
        ps: 20,
        layout: 'pages,jump'
      }
    })
    wrapper.vm.jumpPage = 7
    wrapper.vm.jumpToPage({
      code: 'Enter'
    })
    expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(7)
  })
  it('jump page outof pagecount', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 200,
        pn: 4,
        ps: 20,
        layout: 'pages,jump'
      }
    })
    wrapper.vm.jumpPage = 212
    wrapper.vm.jumpToPage({
      code: 'Enter'
    })
    expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(10)
  })
  it('jump page lt 1', () => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 200,
        pn: 6,
        ps: 20,
        layout: 'pages,jump'
      }
    })
    wrapper.vm.jumpPage = 0
    wrapper.vm.jumpToPage({
      code: 'Enter'
    })
    expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(1)
  })
})

describe('[Pagination] only one page with Event, without ellipsis', () => {
  const wrapper = mount(Pagination, {
    propsData: {
      total: 18
    }
  })
  it('prev, next click', () => {
    wrapper.find('.c-pagination__prev').trigger('click')
    expect(wrapper.find('.c-pagination__page--active').text()).toBe('1')
    wrapper.find('.c-pagination__next').trigger('click')
    expect(wrapper.find('.c-pagination__page--active').text()).toBe('1')
  })
  it('without ellipsis', () => {
    expect(wrapper.find('.c-pagination__ellipsis').element).toBeFalsy()
  })
})

describe('[Pagination] parent Change default', () => {
  test('parent pn change not eq pageNumber', done => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 123,
        ps: 10,
        pn: 2
      }
    })
    wrapper.setProps({
      pn: 8
    })
    setTimeout(() => {
      expect(wrapper.vm.pageNumber).toBe(8)
      done()
    }, DELAY)
  })

  test('next ellipsis update page', () => {
    const span = 2
    const wrapper = mount(Pagination, {
      propsData: {
        total: 120,
        pn: 1,
        ps: 10,
        span
      }
    })
    expect(wrapper.vm.pageNumber).toBe(1)
    wrapper.vm.updatePages('next')
    expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(
      1 + 2 * span + 1
    )
  })

  test('prev ellipsis update page', () => {
    const span = 2
    const wrapper = mount(Pagination, {
      propsData: {
        total: 120,
        pn: 6,
        ps: 10,
        span
      }
    })
    wrapper.vm.updatePages('prev')
    expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(1)
  })

  test('parent pn change eq pageNumber', done => {
    const wrapper = mount(Pagination, {
      propsData: {
        total: 123,
        ps: 10,
        pn: 8
      }
    })
    wrapper.find('.c-pagination__page').trigger('click')
    expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(1)
    wrapper.setProps({
      pn: 1
    })
    setTimeout(() => {
      expect(wrapper.emitted()['page-change'][0][0].detail.pn).toEqual(1)
      done()
    }, DELAY)
  })
})

describe('[Pagination] simple', () => {
  const wrapper = mount(Pagination, {
    propsData: {
      total: 120,
      ps: 10,
      simple: true
    }
  })
  test('jumpPage default is 1', () => {
    expect(wrapper.vm.jumpPage).toBe(1)
    expect(wrapper.find('.c-pagination--simple').element).toBeTruthy()
  })
  test('next event', () => {
    wrapper.find('.c-pagination__next').trigger('click')
    expect(wrapper.vm.jumpPage).toBe(2)
  })
})

describe('[Pagination] size-select', () => {
  let wrapper
  const pageChangeRef = {
    current: null
  }
  beforeEach(() => {
    pageChangeRef.current = jest.fn()
    wrapper = mount(Pagination, {
      propsData: {
        total: 30,
        psOptions: [20, 40],
        layout: 'pages,size-select'
      },
      listeners: {
        'page-change': e => {
          pageChangeRef.current(e)
          // ! hack
          // update wrapper.vm.ps && wrapper.vm.pn
          wrapper.setProps(e.detail)
        }
      }
    })
  })
  afterEach(() => {
    document.body.innerHTML = ''
  })
  it('should render size-select correctly', async () => {
    await Vue.nextTick()
    const select = wrapper.find('.c-select')
    expect(select.element).toBeTruthy()
    // open size-select
    select.trigger('click')
    await Vue.nextTick()
    const panel = document.querySelector('.c-popover')
    expect(panel).toBeTruthy()
    const options = panel.querySelectorAll('[role=option]')
    expect(options.length).toBe(2)
    expect(options[0].textContent.includes('20')).toBe(true)
    expect(options[1].textContent.includes('40')).toBe(true)
  })
  it('should update page size through event', async () => {
    await Vue.nextTick()
    const select = wrapper.find('.c-select')
    expect(select.element).toBeTruthy()
    const getPages = () =>
      wrapper.findAll(
        '[role=button]:not(.c-pagination__prev):not(.c-pagination__next)'
      )
    expect(getPages().length).toBe(2)
    // page: 1 -> 2
    getPages().at(1).trigger('click')
    await Vue.nextTick()
    expect(wrapper.emitted()['page-change'].length).toBe(1)
    expect(pageChangeRef.current).toHaveBeenLastCalledWith({
      detail: { pn: 2, ps: 20 }
    })
    // open size-select
    select.trigger('click')
    await Vue.nextTick()
    const panel = document.querySelector('.c-popover')
    const options = panel.querySelectorAll('[role=option]')
    const clickEvent = new Event('click')

    // select ps -> 40
    // pn 2 -> 1 since the old value 2 exceed the page count(1)
    options[1].dispatchEvent(clickEvent)
    await Vue.nextTick()
    expect(wrapper.emitted()['page-change'].length).toBe(2)
    expect(pageChangeRef.current).toHaveBeenLastCalledWith({
      detail: { pn: 1, ps: 40 }
    })
    // ps -> 40, total -> 30
    // should only display one page
    expect(getPages().length).toBe(1)
    // ! hack
    // click invisible option
    options[0].dispatchEvent(clickEvent)
    await Vue.nextTick()
    expect(wrapper.emitted()['page-change'].length).toBe(3)
    expect(pageChangeRef.current).toHaveBeenLastCalledWith({
      detail: { pn: 1, ps: 20 }
    })
    expect(getPages().length).toBe(2)
  })
})
