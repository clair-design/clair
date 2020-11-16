import Timeline from './src/index'
import TimelineItem from './src/timeline-item'

Timeline.install = Vue => Vue.component(Timeline.name, Timeline)
TimelineItem.install = Vue => Vue.component(TimelineItem.name, TimelineItem)

export default Timeline

export { TimelineItem }
