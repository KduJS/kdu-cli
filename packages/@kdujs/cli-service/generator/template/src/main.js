<%_ if (rootOptions.kduVersion === '3') { _%>
import { createApp } from 'kdu'
import App from './App.kdu'

createApp(App).mount('#app')
<%_ } else { _%>
import Kdu from 'kdu'
import App from './App.kdu'

Kdu.config.productionTip = false

new Kdu({
  <%_ if (doesCompile) { _%>
  render: h => h(App),
  <%_ } else { _%>
  render: function (h) { return h(App) },
  <%_ } _%>
}).$mount('#app')
<%_ } _%>
