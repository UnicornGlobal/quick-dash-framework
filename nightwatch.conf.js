require('@babel/register')
var config = require('./config')

module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_assertions_path: ['test/e2e/custom-assertions'],
  test_workers: false,
  disable_colors: false,

  webdriver: {
    server_path: require('chromedriver').path,
    start_process: true,
    host: 'localhost',
    port: 9515,
    ssl: false,
    timout_options: {
      timeout: 60000,
      retry_attempts: 5
    }
  },

  test_settings: {
    default: {
      end_session_on_fail: true,
      silent: true,
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || config.dev.port)
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: [
            '--window-size=1400,1000',
            '--headless',
            '--disable-gpu',
            '--no-sandbox'
          ]
        }
      }
    },

    chrome: {
      webdriver: {
        port: 9515,
        default_path_prefix: '',
        server_path: require('chromedriver').path,
        cli_args: [
          '--verbose'
        ]
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        loggingPrefs: {
          driver: 'INFO',
          server: 'OFF',
          browser: 'INFO'
        }
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    selenium_server: {
      selenium: {
        start_process: true,
        server_path: require('selenium-server').path,
        host: 'localhost',
        port: 4444,
        end_session_on_fail: true,
        cli_args: {
          'webdriver.chrome.driver': require('chromedriver').path
        }
      },
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
}
