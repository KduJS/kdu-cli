import { h } from 'kdu'
import DefaultTheme from 'witepress/dist/client/theme-default'
import AlgoliaSearchBox from './AlgoliaSearchBox.kdu'
import './custom.css'

export default {
  ...DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'navbar-search': () => {
        return h(AlgoliaSearchBox, {
          options: {
            indexName: 'kdujs_cli',
            apiKey: '032e8e4088d94a9c5223eaea9b6c31d8',
          }
        })
      }
    })
  }
}
