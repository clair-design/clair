import * as bar from './bar'
import barDefault, { bar as barLocal } from './bar'
import { dir } from './dir'
export * as b from './dir'
export * from './dir'

export { dir } from './dir'

function App() {
  return <div>app</div>
}
