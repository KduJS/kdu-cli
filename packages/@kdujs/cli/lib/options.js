const fs = require('fs')
const cloneDeep = require('lodash.clonedeep')
const { getRcPath } = require('./util/rcPath')
const { exit } = require('@kdujs/cli-shared-utils/lib/exit')
const { error } = require('@kdujs/cli-shared-utils/lib/logger')
const { createSchema, validate } = require('@kdujs/cli-shared-utils/lib/validate')

const rcPath = exports.rcPath = getRcPath('.kdurc')

const presetSchema = createSchema(joi => joi.object().keys({
  bare: joi.boolean(),
  useConfigFiles: joi.boolean(),
  router: joi.boolean(),
  routerHistoryMode: joi.boolean(),
  kdux: joi.boolean(),
  cssPreprocessor: joi.string().only(['sass', 'less', 'stylus']),
  plugins: joi.object().required(),
  configs: joi.object()
}))

const schema = createSchema(joi => joi.object().keys({
  packageManager: joi.string().only(['yarn', 'npm']),
  useTaobaoRegistry: joi.boolean(),
  presets: joi.object().pattern(/^/, presetSchema)
}))

exports.validatePreset = preset => validate(preset, presetSchema, msg => {
  error(`invalid preset options: ${msg}`)
})

exports.defaultPreset = {
  router: false,
  kdux: false,
  useConfigFiles: false,
  cssPreprocessor: undefined,
  plugins: {
    '@kdujs/cli-plugin-babel': {},
    '@kdujs/cli-plugin-eslint': {
      config: 'base',
      lintOn: ['save']
    }
  }
}

exports.defaults = {
  packageManager: undefined,
  useTaobaoRegistry: undefined,
  presets: {
    'default': exports.defaultPreset
  }
}

let cachedOptions

exports.loadOptions = () => {
  if (cachedOptions) {
    return cachedOptions
  }
  if (fs.existsSync(rcPath)) {
    try {
      cachedOptions = JSON.parse(fs.readFileSync(rcPath, 'utf-8'))
    } catch (e) {
      error(
        `Error loading saved preferences: ` +
        `~/.kdurc may be corrupted or have syntax errors. ` +
        `Please fix/delete it and re-run kdu-cli in manual mode.\n` +
        `(${e.message})`,
      )
      exit(1)
    }
    validate(cachedOptions, schema, () => {
      error(
        `~/.kdurc may be outdated. ` +
        `Please delete it and re-run kdu-cli in manual mode.`
      )
    })
    return cachedOptions
  } else {
    return {}
  }
}

exports.saveOptions = toSave => {
  const options = Object.assign(cloneDeep(exports.loadOptions()), toSave)
  for (const key in options) {
    if (!(key in exports.defaults)) {
      delete options[key]
    }
  }
  cachedOptions = options
  try {
    fs.writeFileSync(rcPath, JSON.stringify(options, null, 2))
  } catch (e) {
    error(
      `Error saving preferences: ` +
      `make sure you have write access to ${rcPath}.\n` +
      `(${e.message})`
    )
  }
}

exports.savePreset = (name, preset) => {
  const presets = cloneDeep(exports.loadOptions().presets || {})
  presets[name] = preset
  exports.saveOptions({ presets })
}
