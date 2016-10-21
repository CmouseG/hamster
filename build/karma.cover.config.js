var assign = require('object-assign')
var base = require('./karma.base.config.js')

module.exports = function(config) {
    var options = assign(base, {
        browsers: ['PhantomJS'],
        reporters: ['progress', 'coverage'],
        coverageReporter: {
            reporters: [
                { type: 'lcov', dir: '../test/unit/coverage', subdir: '.' },
                { type: 'text-summary', dir: '../test/unit/coverage', subdir: '.' }
            ]
        }
    })

    config.set(options)
}
