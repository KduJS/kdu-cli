const launch = require('@nkduy/launch-editor')

exports.launch = (...args) => {
  const file = args[0]
  console.log(`Opening ${file}...`)
  let cb = args[args.length - 1]
  if (typeof cb !== 'function') {
    cb = null
  }
  launch(...args, (fileName, errorMessage) => {
    console.error(`Unable to open '${fileName}'`, errorMessage)
    console.log(`Try setting the EDITOR env variable. More info: https://github.com/khanhduy1407/launch-editor`)

    if (cb) cb(fileName, errorMessage)
  })
}
