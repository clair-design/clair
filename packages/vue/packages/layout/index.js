import Layout from './src/index'
import Header from './src/header'
import Aside from './src/aside'
import Main from './src/main'
import Footer from './src/footer'

Layout.install = Vue => Vue.component(Layout.name, Layout)
Header.install = Vue => Vue.component(Header.name, Header)
Aside.install = Vue => Vue.component(Aside.name, Aside)
Main.install = Vue => Vue.component(Main.name, Main)
Footer.install = Vue => Vue.component(Footer.name, Footer)

const WholeLayout = {
  install(Vue) {
    ;[Layout, Header, Main, Aside, Footer].forEach(component => {
      Vue.use(component)
    })
  }
}
export default WholeLayout
export { Header, Aside, Main, Footer, Layout }
