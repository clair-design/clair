import Tree from './src/index'
Tree.install = Vue => Vue.component(Tree.name, Tree)

export { Tree as default }
