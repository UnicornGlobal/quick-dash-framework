/**
 * Module dependencies
 */
const Nightwatch = require('nightwatch')

process.env.NODE_ENV = 'development'
var server = require('../../build/dev-server.js')

server.ready.then(() => {
  try {
    Nightwatch.cli(function(argv) {
      argv._source = argv['_'].slice(0)

      const runner = Nightwatch.CliRunner(argv)
      runner.setup()
        .startWebDriver()
        .catch(err => {
          throw err
        })
        .then(() => {
          return runner.runTests()
        })
        .catch(err => {
          console.log(err)
          runner.processListener.setExitCode(10)
          server.close()
          process.exit(10)
        })
        .then(() => {
          server.close()
          return runner.stopWebDriver().then(() => { process.exit(0) })
        })
        .catch(err => {
          console.log(err)
          runner.processListener.setExitCode(10)
          server.close()
          process.exit(10)
        })
    })
  } catch (err) {
    console.log(err)
    server.close()
    process.exit(2)
  }
})
