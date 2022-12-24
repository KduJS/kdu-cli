module.exports = (api, options) => {
  api.render('./template', {
    doesCompile: api.hasPlugin('babel') || api.hasPlugin('typescript'),
    useBabel: api.hasPlugin('babel')
  })

  if (options.kduVersion === '3') {
    api.extendPackage({
      dependencies: {
        'kdu': '^3.2.33'
      }
    })
  } else {
    api.extendPackage({
      dependencies: {
        'kdu': '^2.6.14'
      },
      devDependencies: {
        'kdu-template-compiler': '^2.6.14'
      }
    })
  }

  api.extendPackage({
    scripts: {
      'serve': 'kdu-cli-service serve',
      'build': 'kdu-cli-service build'
    },
    browserslist: [
      '> 1%',
      'last 2 versions',
      'not dead',
      ...(options.kduVersion === '3' ? ['not ie 11'] : [])
    ]
  })

  if (options.cssPreprocessor) {
    const deps = {
      sass: {
        sass: '^1.32.7',
        'sass-loader': '^12.0.0'
      },
      'dart-sass': {
        sass: '^1.32.7',
        'sass-loader': '^12.0.0'
      },
      less: {
        'less': '^4.0.0',
        'less-loader': '^8.0.0'
      },
      stylus: {
        'stylus': '^0.55.0',
        'stylus-loader': '^6.1.0'
      }
    }

    api.extendPackage({
      devDependencies: deps[options.cssPreprocessor]
    })
  }

  // for v3 compatibility
  if (options.router && !api.hasPlugin('router')) {
    require('./router')(api, options, options)
  }

  // for v3 compatibility
  if (options.kdux && !api.hasPlugin('kdux')) {
    require('./kdux')(api, options, options)
  }

  // additional tooling configurations
  if (options.configs) {
    api.extendPackage(options.configs)
  }

  // Delete jsconfig.json when typescript
  if (api.hasPlugin('typescript')) {
    api.render((files) => delete files['jsconfig.json'])
  }
}
