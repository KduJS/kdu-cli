import { h } from 'kdu'
import DefaultTheme from 'witepress/dist/client/theme-default'
import AlgoliaSearchBox from './AlgoliaSearchBox.kdu'
import './custom.css'
import { useData } from 'witepress'

export default {
  ...DefaultTheme,
  Layout: {
    setup() {
      const { lang } = useData()
      return () => {
        return h(DefaultTheme.Layout, null, {
          'page-top': () => {
            return notice_en()
          },
          'navbar-search': () => {
            return h(AlgoliaSearchBox, {
              options: {
                indexName: 'kdujs_cli',
                apiKey: '032e8e4088d94a9c5223eaea9b6c31d8'
              }
            })
          }
        })
      }
    }
  }
}

function notice_en() {
  return h('div', { class: 'warning custom-block' }, [
    h('p', { class: 'custom-block-title' }, '⚠️ Notice'),
    h('p', [
      'Kdu CLI is now in maintenance mode. For new projects, please use ',
      h(
        'a',
        {
          href: 'https://github.com/kdujs/create-kdu',
          target: '_blank'
        },
        [h('code', 'create-kdu')]
      ),
      ' to scaffold ',
      h('a', { href: 'https://witejs.web.app', target: '_blank' }, 'Wite'),
      '-based projects. ',
      h('code', 'create-kdu'),
      ' supports both Kdu 2 and Kdu 3.'
    ]),
    h('p', [
      'Also refer to the ',
      h(
        'a',
        {
          href: 'https://kdu-js.web.app/guide/scaling-up/tooling.html',
          target: '_blank'
        },
        'Kdu 3 Tooling Guide'
      ),
      ' for the latest recommendations.'
    ])
  ])
}
