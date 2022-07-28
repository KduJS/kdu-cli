const CONFIG = 'app.web.kdujs-eslintrc'

const CATEGORIES = [
  'essential',
  'strongly-recommended',
  'recommended',
  'uncategorized'
]

const DEFAULT_CATEGORY = 'essential'
const RULE_SETTING_OFF = 'off'
const RULE_SETTING_ERROR = 'error'
const RULE_SETTING_WARNING = 'warn'
const RULE_SETTINGS = [RULE_SETTING_OFF, RULE_SETTING_ERROR, RULE_SETTING_WARNING]

const defaultChoices = [
  {
    name: 'app.web.kdujs-eslint.config.eslint.setting.off',
    value: JSON.stringify(RULE_SETTING_OFF)
  },
  {
    name: 'app.web.kdujs-eslint.config.eslint.setting.error',
    value: JSON.stringify(RULE_SETTING_ERROR)
  },
  {
    name: 'app.web.kdujs-eslint.config.eslint.setting.warning',
    value: JSON.stringify(RULE_SETTING_WARNING)
  }
]

function escapeHTML (text) {
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function getEslintConfigName (eslint) {
  let config = eslint.extends

  if (eslint.extends instanceof Array) {
    config = eslint.extends.find(configName => configName.startsWith('plugin:kdu/'))
  }

  return config && config.startsWith('plugin:kdu/') ? config : null
}

// Sets default value regarding selected global config
function getDefaultValue (rule, data) {
  const { category: ruleCategory } = rule.meta.docs
  const currentCategory = getEslintConfigName(data.eslint)

  if (!currentCategory || ruleCategory === undefined) return RULE_SETTING_OFF

  return CATEGORIES.indexOf(ruleCategory) <= CATEGORIES.indexOf(currentCategory.split('/')[1])
    ? RULE_SETTING_ERROR
    : RULE_SETTING_OFF
}

function getEslintPrompts (data, rules) {
  const allRules = Object.keys(rules)
    .map(ruleKey => ({
      ...rules[ruleKey],
      name: `kdu/${ruleKey}`
    }))

  return CATEGORIES
    .map(category =>
      allRules.filter(rule =>
        rule.meta.docs.category === category || (
          category === 'uncategorized' &&
          rule.meta.docs.category === undefined
        )
      )
    )
    .reduce((acc, rulesArr) => [...acc, ...rulesArr], [])
    .map(rule => {
      const value = data.eslint &&
        data.eslint.rules &&
        data.eslint.rules[rule.name]

      return {
        name: rule.name,
        type: 'list',
        message: rule.name,
        group: `app.web.kdujs-eslint.config.eslint.groups.${rule.meta.docs.category || 'uncategorized'}`,
        description: escapeHTML(rule.meta.docs.description),
        link: rule.meta.docs.url,
        default: JSON.stringify(getDefaultValue(rule, data)),
        value: JSON.stringify(value),
        choices: !value || RULE_SETTINGS.indexOf(value) > -1
          ? defaultChoices
          : [...defaultChoices, {
            name: 'app.web.kdujs-eslint.config.eslint.setting.custom',
            value: JSON.stringify(value)
          }]
      }
    })
}

function onRead ({ data, cwd }) {
  const { loadModule } = require('@kdujs/cli-shared-utils')
  const rules = loadModule('eslint-plugin-kdu', cwd, true).rules

  return {
    tabs: [
      {
        id: 'general',
        label: 'app.web.kdujs-eslint.config.eslint.general.label',
        prompts: [
          {
            name: 'lintOnSave',
            type: 'confirm',
            message: 'app.web.kdujs-eslint.config.eslint.general.lintOnSave.message',
            description: 'app.web.kdujs-eslint.config.eslint.general.lintOnSave.description',
            link: 'https://github.com/kdujs/kdu-cli/tree/main/packages/%40kdujs/cli-plugin-eslint#configuration',
            default: true,
            value: data.kdu && data.kdu.lintOnSave
          },
          {
            name: 'config',
            type: 'list',
            message: 'app.web.kdujs-eslint.config.eslint.general.config.message',
            description: 'app.web.kdujs-eslint.config.eslint.general.config.description',
            link: 'https://github.com/kdujs/eslint-plugin-kdu',
            default: `plugin:kdu/${DEFAULT_CATEGORY}`,
            choices: CATEGORIES.filter(category => category !== 'uncategorized').map(category => ({
              name: `app.web.kdujs-eslint.config.eslint.groups.${category}`,
              value: `plugin:kdu/${category}`
            })),
            value: getEslintConfigName(data.eslint)
          }
        ]
      },
      {
        id: 'rules',
        label: 'app.web.kdujs-eslint.config.eslint.rules.label',
        prompts: getEslintPrompts(data, rules)
      }
    ]
  }
}

async function onWrite ({ data, api, prompts }) {
  const eslintData = { ...data.eslint }
  const kduData = {}
  for (const prompt of prompts) {
    // eslintrc
    if (prompt.id === 'config') {
      if (eslintData.extends instanceof Array) {
        const kduEslintConfig = eslintData.extends.find(config => config.indexOf('plugin:kdu/') === 0)
        const index = eslintData.extends.indexOf(kduEslintConfig)
        eslintData.extends[index] = JSON.parse(prompt.value)
      } else {
        eslintData.extends = JSON.parse(prompt.value)
      }
    } else if (prompt.id.indexOf('kdu/') === 0) {
      eslintData[`rules.${prompt.id}`] = await api.getAnswer(prompt.id, JSON.parse)
    } else {
      // kdu.config.js
      kduData[prompt.id] = await api.getAnswer(prompt.id)
    }
  }
  api.setData('eslint', eslintData)
  api.setData('kdu', kduData)
}

const config = {
  id: CONFIG,
  name: 'ESLint configuration',
  description: 'app.web.kdujs-eslint.config.eslint.description',
  link: 'https://github.com/kdujs/eslint-plugin-kdu',
  files: {
    eslint: {
      js: ['.eslintrc.js'],
      json: ['.eslintrc', '.eslintrc.json'],
      yaml: ['.eslintrc.yaml', '.eslintrc.yml'],
      package: 'eslintConfig'
    },
    kdu: {
      js: ['kdu.config.js']
    }
  },
  onRead,
  onWrite
}

module.exports = {
  config,
  getEslintConfigName,
  getDefaultValue,
  getEslintPrompts
}
