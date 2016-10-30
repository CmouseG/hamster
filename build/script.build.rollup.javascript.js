process.env.BABEL_ENV = 'production'

var
  fs = require('fs'),
  zlib = require('zlib'),
  rollup = require('rollup'),
  uglify = require('uglify-js'),
  babel = require('rollup-plugin-babel'),
  string = require('rollup-plugin-string'),
  vue = require('rollup-plugin-vue'),
  nonStandalone = process.argv[2] === 'simple' || process.argv[3] === 'simple',
  version = process.env.VERSION || require('../package.json').version,
  file,
  banner =
    '/*!\r\n' +
    ' * hamster Framework v' + version + '\r\n' +
    ' * (c) ' + new Date().getFullYear() + ' Razvan Stoenescu\r\n' +
    ' * Released under the MIT License.\r\n' +
    ' */',
  babelConfig = {
    exclude: 'node_modules/**',
    runtimeHelpers: true
  },
  stringConfig = {
    include: ['**/*.svg', '**/*.html']
  },
  external = [
    'velocity-animate',
    'velocity-animate/velocity.ui'
  ],
  globals = {
    'velocity-animate/velocity.ui': 'velui'
  },
  rollupConfig = {
    entry: 'src/index.js',
    plugins: [vue(), string(stringConfig), babel(babelConfig)],
    external: external
  }

'index'.split(' ').forEach(function (name) { // eslint-disable-line
  file = fs
    .readFileSync('src/' + name + '.js', 'utf-8')
    .replace(/version: '[\d\.]+'/, "version: '" + version + "'")
  fs.writeFileSync('src/' + name + '.js', file)
})

// CommonJS build.
rollup
.rollup(rollupConfig)
.then(function (bundle) {
  return write('dist2/js/hamster.common.js', bundle.generate({
    format: 'cjs',
    banner: banner,
    globals: globals
  }).code)
})
// ES6 Dev Build
.then(function () {
  return rollup
    .rollup({
      entry: 'src/index.js',
      plugins: [vue(), string(stringConfig)],
      external: external
    })
    .then(function (bundle) {
      return write('dist2/js/hamster.js', bundle.generate({
        exports: 'named',
        banner: banner,
        globals: globals
      }).code)
    })
})
// Standalone Dev Build
.then(function () {
  if (nonStandalone) {
    return
  }
  return rollup.rollup(rollupConfig)
  .then(function (bundle) {
    return write('dist2/js/hamster.standalone.js', bundle.generate({
      format: 'umd',
      banner: banner,
      moduleName: 'hamster',
      globals: globals
    }).code)
  })
})
// Standalone Production Build
.then(function () {
  if (nonStandalone) {
    return
  }
  return rollup.rollup(rollupConfig)
  .then(function (bundle) {
    var code, res, map

    code = bundle.generate({
      format: 'umd',
      moduleName: 'hamster',
      banner: banner,
      globals: globals
    }).code

    res = uglify.minify(code, {
      fromString: true,
      outSourceMap: 'hamster.standalone.min.js.map',
      output: {
        preamble: banner,
        ascii_only: true
      }
    })

    // fix uglifyjs sourcemap
    map = JSON.parse(res.map)
    map.sources = ['hamster.standalone.js']
    map.sourcesContent = [code]
    map.file = 'hamster.standalone.min.js'

    return [
      write('dist2/js/hamster.standalone.min.js', res.code),
      write('dist2/js/hamster.standalone.min.js.map', JSON.stringify(map))
    ]
  })
  .then(zip)
})
.catch(function (e) {
  console.log(e)
})

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(dest.bold + ' ' + getSize(code).gray)
      resolve()
    })
  })
}

function zip () {
  return new Promise(function (resolve, reject) {
    fs.readFile('dist2/js/hamster.standalone.min.js', function (err, buf) {
      if (err) return reject(err)
      zlib.gzip(buf, function (err, buf) {
        if (err) return reject(err)
        write('dist2/js/hamster.standalone.min.js.gz', buf).then(resolve)
      })
    })
  })
}

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}
