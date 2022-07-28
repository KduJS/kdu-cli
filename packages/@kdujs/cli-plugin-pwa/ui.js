module.exports = api => {
  const CONFIG = 'app.web.kdujs-pwa'

  // Config file
  api.describeConfig({
    id: CONFIG,
    name: 'PWA',
    description: 'app.web.kdujs-pwa.config.pwa.description',
    link: 'https://github.com/kdujs/kdu-cli/tree/main/packages/%40kdujs/cli-plugin-pwa#configuration',
    files: {
      kdu: {
        js: ['kdu.config.js']
      },
      manifest: {
        json: ['public/manifest.json']
      }
    },
    onRead: ({ data }) => {
      // Dirty hack here: only in onRead can we delete files from the original data.
      // Remove (or, don't create the file) manifest.json if no actual content in it.
      if (!data.manifest || !Object.keys(data.manifest).length) {
        delete data.manifest
      }

      return {
        prompts: [
          {
            name: 'workboxPluginMode',
            type: 'list',
            message: 'app.web.kdujs-pwa.config.pwa.workboxPluginMode.message',
            description: 'app.web.kdujs-pwa.config.pwa.workboxPluginMode.description',
            link: 'https://developer.chrome.com/docs/workbox/modules/workbox-webpack-plugin/#which-plugin-to-use',
            default: 'GenerateSW',
            value: data.kdu && data.kdu.pwa && data.kdu.pwa.workboxPluginMode,
            choices: [
              {
                name: 'GenerateSW',
                value: 'GenerateSW'
              },
              {
                name: 'InjectManifest',
                value: 'InjectManifest'
              }
            ]
          },
          {
            name: 'name',
            type: 'input',
            message: 'app.web.kdujs-pwa.config.pwa.name.message',
            description: 'app.web.kdujs-pwa.config.pwa.name.description',
            value: data.kdu && data.kdu.pwa && data.kdu.pwa.name
          },
          {
            name: 'themeColor',
            type: 'color',
            message: 'app.web.kdujs-pwa.config.pwa.themeColor.message',
            description: 'app.web.kdujs-pwa.config.pwa.themeColor.description',
            default: '#03A9F4',
            value: data.kdu && data.kdu.pwa && data.kdu.pwa.themeColor
          },
          {
            name: 'backgroundColor',
            type: 'color',
            message: 'app.web.kdujs-pwa.config.pwa.backgroundColor.message',
            description: 'app.web.kdujs-pwa.config.pwa.backgroundColor.description',
            default: '#000000',
            value:
              (data.kdu &&
                data.kdu.pwa &&
                data.kdu.pwa.manifestOptions &&
                data.kdu.pwa.manifestOptions.background_color) ||
              (data.manifest && data.manifest.background_color),
            skipSave: true
          },
          {
            name: 'msTileColor',
            type: 'color',
            message: 'app.web.kdujs-pwa.config.pwa.msTileColor.message',
            description: 'app.web.kdujs-pwa.config.pwa.msTileColor.description',
            default: '#000000',
            value: data.kdu && data.kdu.pwa && data.kdu.pwa.msTileColor
          },
          {
            name: 'appleMobileWebAppStatusBarStyle',
            type: 'input',
            message: 'app.web.kdujs-pwa.config.pwa.appleMobileWebAppStatusBarStyle.message',
            description: 'app.web.kdujs-pwa.config.pwa.appleMobileWebAppStatusBarStyle.description',
            default: 'default',
            value: data.kdu && data.kdu.pwa && data.kdu.pwa.appleMobileWebAppStatusBarStyle
          },
          {
            name: 'manifestCrossorigin',
            type: 'list',
            message: 'app.web.kdujs-pwa.config.pwa.manifestCrossorigin.message',
            description: 'app.web.kdujs-pwa.config.pwa.manifestCrossorigin.description',
            default: null,
            value: data.kdu && data.kdu.pwa && data.kdu.pwa.manifestCrossorigin,
            choices: [
              {
                name: 'none',
                value: null
              },
              {
                name: 'anonymous',
                value: 'anonymous'
              },
              {
                name: 'use-credentials',
                value: 'use-credentials'
              }
            ]
          }
        ]
      }
    },
    onWrite: async ({ api: onWriteApi, data, prompts }) => {
      const result = {}
      for (const prompt of prompts.filter(p => !p.raw.skipSave)) {
        result[`pwa.${prompt.id}`] = await onWriteApi.getAnswer(prompt.id)
      }

      const backgroundColor = await onWriteApi.getAnswer('backgroundColor')
      if (!data.manifest && backgroundColor) {
        result['pwa.manifestOptions.background_color'] = backgroundColor
      }

      onWriteApi.setData('kdu', result)

      // Update app manifest (only when there's a manifest.json file,
      // otherwise it will be inferred from options in kdu.config.js)
      if (data.manifest) {
        const name = result.name
        if (name) {
          onWriteApi.setData('manifest', {
            name,
            short_name: name
          })
        }

        const themeColor = result.themeColor
        if (themeColor) {
          onWriteApi.setData('manifest', {
            theme_color: themeColor
          })
        }

        if (backgroundColor) {
          onWriteApi.setData('manifest', {
            background_color: backgroundColor
          })
        }
      }
    }
  })

  const OPEN_KDU = 'app.web.kdujs-pwa.open-kdu'
  const OPEN_MANIFEST = 'app.web.kdujs-pwa.open-manifest'

  api.onViewOpen(({ view }) => {
    if (view.id !== 'kdu-project-configurations') {
      removeSuggestions()
    }
  })

  api.onConfigRead(({ config }) => {
    if (config.id === CONFIG) {
      if (config.foundFiles.kdu) {
        api.addSuggestion({
          id: OPEN_KDU,
          type: 'action',
          label: 'app.web.kdujs-pwa.suggestions.open-kdu.label',
          handler () {
            const file = config.foundFiles.kdu.path
            const { launch } = require('@kdujs/cli-shared-utils')
            launch(file)
            return {
              keep: true
            }
          }
        })
      } else {
        api.removeSuggestion(OPEN_KDU)
      }
      if (config.foundFiles.manifest) {
        api.addSuggestion({
          id: OPEN_MANIFEST,
          type: 'action',
          label: 'app.web.kdujs-pwa.suggestions.open-manifest.label',
          handler () {
            const file = config.foundFiles.manifest.path
            const { launch } = require('@kdujs-/cli-shared-utils')
            launch(file)
            return {
              keep: true
            }
          }
        })
      } else {
        api.removeSuggestion(OPEN_MANIFEST)
      }
    } else {
      removeSuggestions()
    }
  })

  function removeSuggestions () {
    [OPEN_KDU, OPEN_MANIFEST].forEach(id => api.removeSuggestion(id))
  }
}
