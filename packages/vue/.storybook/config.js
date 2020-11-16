import { configure, addParameters, storiesOf } from '@storybook/vue'
import './runtime/runtime'

function loadStories() {
  const stories = {}
  const registerRequests = request => {
    const keys = request.keys()
    for (let i = 0; i < keys.length; i++) {
      const { group = '其他', description, ...Component } = request(keys[i])
      stories[group] = stories[group] || []
      stories[group].push({
        group,
        description,
        render(h) {
          return h(Component)
        }
      })
    }
  }

  registerRequests(require.context('../docs', true, /\.md$/))
  registerRequests(require.context('../packages', true, /\.md$/))

  const groups = [
    'Basic 基础',
    'Form 表单',
    'Data 数据展示',
    'Navigation 导航',
    '其他'
    // more...
  ]

  let i = 0
  groups.forEach(group => {
    const story = storiesOf(group, module)
    if (stories[group]) {
      stories[group].forEach(item => {
        story.add(item.description || `Unknown Title ${++i}`, () => ({
          render: item.render
        }))
      })
    }
  })
}

addParameters({
  options: {
    brandTitle: 'Clair Vue',
    brandUrl: 'https://github.com/clair-design/clair-vue',
    sidebarAnimations: true,
    showSearchBox: false,
    showPanel: false
  }
})

configure(loadStories, module)
