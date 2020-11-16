import { Col, Row } from './src/index'

Col.install = Vue => Vue.component(Col.name, Col)
Row.install = Vue => Vue.component(Row.name, Row)

export { Row, Col }
