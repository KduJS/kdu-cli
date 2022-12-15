import Kdu from 'kdu'
import App from './App.kdu'

Kdu.config.productionTip = false

new Kdu({
  render: h => h(App)
}).$mount('#app')
