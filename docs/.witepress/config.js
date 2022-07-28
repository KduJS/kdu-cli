const fs = require('fs')
const path = require('path')

const selfDestroyingSWWitePlugin = {
  name: 'generate-self-destroying-service-worker',
  buildStart() {
    this.emitFile({
      type: 'asset',
      fileName: 'service-worker.js',
      source: fs.readFileSync(path.join(__dirname, './self-destroying-service-worker.js'), 'utf-8')
    })
  }
}

module.exports = {
  wite: {
    // to destroy the service worker used by the previous kdupress build
    plugins: [selfDestroyingSWWitePlugin]
  },

  locales: {
    '/': {
      lang: 'en-US',
      title: 'Kdu CLI',
      description: 'Standard Tooling for Kdu.js Development'
    },
    // '/vi': {
    //   lang: 'vi-VN',
    //   title: 'Kdu CLI',
    //   description: 'Standard Tooling for Kdu.js Development'
    // },
  },

  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#03a9f4' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }
    ],
    [
      'link',
      { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: '/icons/safari-pinned-tab.svg',
        color: '#03a9f4'
      }
    ],
    [
      'meta',
      {
        name: 'msapplication-TileImage',
        content: '/icons/msapplication-icon-144x144.png'
      }
    ],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],

  themeConfig: {
    repo: 'kdujs/kdu-cli',
    docsDir: 'docs',
    docsBranch: 'main',
    editLinks: true,

    algolia: {
      indexName: 'kdujs_cli',
      apiKey: '032e8e4088d94a9c5223eaea9b6c31d8'
    },

    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        lastUpdated: 'Last Updated',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          {
            text: 'Guide',
            link: '/guide/'
          },
          {
            text: 'Config Reference',
            link: '/config/'
          },
          {
            text: 'Plugins',
            items: [
              {
                text: 'Core Plugins',
                link: '/core-plugins/'
              },
              {
                text: 'Plugin Dev Guide',
                link: '/dev-guide/plugin-dev'
              },
              {
                text: 'Plugin API',
                link: '/dev-guide/plugin-api'
              },
              {
                text: 'Generator API',
                link: '/dev-guide/generator-api'
              }
            ]
          }
        ],
        sidebar: {
          '/guide/': [
            {
              text: 'Overview',
              link: '/guide/',
              collapsable: true
            },

            {
              text: 'Installation',
              link: '/guide/installation'
            },

            {
              text: 'Basics',
              collapsable: false,
              children: [
                {
                  text: 'Creating a Project',
                  link: '/guide/creating-a-project'
                },
                {
                  text: 'Plugins and Presets',
                  link: '/guide/plugins-and-presets'
                },
                {
                  text: 'CLI Service',
                  link: '/guide/cli-service'
                }
              ]
            },

            {
              text: 'Development',
              collapsable: false,
              children: [
                {
                  text: 'Browser Compatibility',
                  link: '/guide/browser-compatibility'
                },
                {
                  text: 'HTML and Static Assets',
                  link: '/guide/html-and-static-assets'
                },
                {
                  text: 'Working with CSS',
                  link: '/guide/css'
                },
                {
                  text: 'Working with Webpack',
                  link: '/guide/webpack'
                },
                {
                  text: 'Modes and Environment Variables',
                  link: '/guide/mode-and-env'
                },
                {
                  text: 'Build Targets',
                  link: '/guide/build-targets'
                },
                {
                  text: 'Deployment',
                  link: '/guide/deployment'
                },
                {
                  text: 'Troubleshooting',
                  link: '/guide/troubleshooting'
                }
              ]
            }
          ],

          '/dev-guide/': [
            {
              text: 'Plugin Development Guide',
              link: '/dev-guide/plugin-dev'
            },
            {
              text: 'API reference',
              collapsable: false,
              children: [
                {
                  text: 'Plugin API',
                  link: '/dev-guide/plugin-api'
                },
                {
                  text: 'Generator API',
                  link: '/dev-guide/generator-api'
                }
              ]
            }
          ],

          '/core-plugins/': [
            {
              text: 'Core Kdu CLI Plugins',
              collapsable: false,
              children: [
                {
                  text: '@kdujs/cli-plugin-babel',
                  link: '/core-plugins/babel'
                },
                {
                  text: '@kdujs/cli-plugin-typescript',
                  link: '/core-plugins/typescript'
                },
                {
                  text: '@kdujs/cli-plugin-eslint',
                  link: '/core-plugins/eslint'
                },
                {
                  text: '@kdujs/cli-plugin-pwa',
                  link: '/core-plugins/pwa'
                }
              ]
            }
          ]
        }
      },
    }
  },
}
