var
  fs = require('fs'),
  path = require('path'),
  stylus = require('stylus'),
  postcss = require('postcss'),
  cssnano = require('cssnano'),
  autoprefixer = require('autoprefixer'),
  themes = ['oth', 'mat'],
  nonStandalone = process.argv[2] === 'simple' || process.argv[3] === 'simple',
  version = process.env.VERSION || require('../package.json').version,
  banner =
    '/*!\n' +
    ' * hamster Framework v' + version + '\n' +
    ' * (c) ' + new Date().getFullYear() + ' \n' +
    ' * Released under the MIT License.\n' +
    ' */\n'

themes.forEach(function (theme) {
  var
    src = 'src/themes/hamster.' + theme + '.styl',
    deps,
    data

  deps = stylus(readFile(src))
    .set('paths', [path.join(__dirname, '../src/themes/')])
    .deps()

  data = compile([src].concat(deps))

  // write Stylus file
  writeFile('dist/static/css/hamster.' + theme + '.styl', data)

  // write compiled CSS file
  stylus(data).render(function (err, css) {
    if (err) {
      logError('Stylus could not compile ' + src.gray + ' file...')
      throw err
    }

    // write unprefixed non-standalone version
    writeFile('dist/static/css/hamster.' + theme + '.css', css)

    if (nonStandalone) {
      return
    }

    // write auto-prefixed standalone version
    postcss([autoprefixer]).process(css).then(function (result) {
      result.warnings().forEach(function (warn) {
        console.warn(warn.toString())
      })
      writeFile('dist/static/css/hamster.' + theme + '.standalone.css', result.css)
      cssnano.process(result.css).then(function (result) {
        writeFile('dist/static/css/hamster.' + theme + '.standalone.min.css', result.css)
      })
    })
  })
})

function logError (err) {
  console.error('[Error]'.red, err)
}

function readFile (file) {
  return fs.readFileSync(file, 'utf-8')
}

function writeFile (file, data) {
  fs.writeFile(file, data, 'utf-8', function (err) {
    if (err) {
      logError('Could not write ' + file.gray + ' file...')
      return
    }
    console.log(file + ' ' + getSize(data))
    // console.log(file.bold + ' ' + getSize(data).gray)
  })
}

function compile (src) {
  var data = banner

  src.forEach(function (file) {
    data += readFile(file) + '\n'
  })

  return data
    // remove imports
    .replace(/@import '[^']+'\n/g, '')
    // remove comments
    .replace(/(\/\*[\w'-\.,`\s\r\n\*@]*\*\/)|(\/\/[^\n]*)/g, '')
    // remove unnecessary newlines
    .replace(/\n[\n]+/g, '\n')
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}
