import { mount } from '@vue/test-utils'
import Card from './index.vue'
import Button from '../button/index.vue'

it('should render card correctly', () => {
  const wrapper = mount(Card, {
    stubs: {
      'c-button': Button
    },
    slots: {
      title: '<h3>卡片标题</h3>',
      default: '<div>这里是卡片介绍</div>',
      actions: [
        '<c-button flat primary icon="heart">加入收藏</c-button>',
        '<c-button flat icon="download">下载</c-button>'
      ]
    }
  })
  expect(wrapper).toMatchSnapshot()
})

it('should render horizontal card correctly', () => {
  const wrapper = mount(Card, {
    propsData: { horizontal: true },
    stubs: {
      'c-button': Button
    },
    slots: {
      default: '<div>云中温度低于0℃的许多小云滴在冰晶上互相碰撞凝结形成雪珠，小雪珠是由许多细白的冰粒聚集而成的。</div>',
      media: '<img src="https://p0.ssl.qhimg.com/dm/100_100_90/t019549f24fd684aeb8.jpg" />'
    }
  })
  expect(wrapper).toMatchSnapshot()
})
