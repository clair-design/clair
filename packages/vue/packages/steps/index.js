import { Steps, Step } from './src/index'

Steps.install = Vue => Vue.component(Steps.name, Steps)
Step.install = Vue => Vue.component(Step.name, Step)

export { Steps, Step }
