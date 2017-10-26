// 引入 css
import '../css/main.css'

// polyfill `Object.assign`
// SEE https://www.npmjs.com/package/object-assign
Object.assign = Object.assign || require('object-assign')

// NOTICE: 引入其他必要的模块
// NOTICE: Below are necessary modules/files to be imported
// import 'other-files'
// ...

// WARNING: 以下无内容
// WARNING: NO content allowed AFTER THIS LINE!!!

// WARNING: 以下工作无需手动进行 只需在配置中通过 rollup 插件引入
//
// 引入各个组件并暴露带有 install 方法的对象
// import 'other components'
// export default{ install () {} }
// ...
