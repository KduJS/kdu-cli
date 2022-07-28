import './setPublicPath'
import Kdu from 'kdu'
import wrap from '@kdujs/web-component-wrapper'

// runtime shared by every component chunk
import 'css-loader/dist/runtime/api.js'
import 'kdu-style-loader/lib/addStylesShadow'
import 'kdu-loader/lib/runtime/componentNormalizer'

window.customElements.define('build-wc-async-app', wrap(Kdu, () => import('~root/src/App.kdu?shadow')))

window.customElements.define('build-wc-async-hello-world', wrap(Kdu, () => import('~root/src/components/HelloWorld.kdu?shadow')))
