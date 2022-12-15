import Kdu from 'kdu'
import App from '~entry'

Kdu.config.productionTip = false

new Kdu({ render: h => h(App) }).$mount('#app')
