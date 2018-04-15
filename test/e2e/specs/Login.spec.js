// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'test login page': function (browser) {
    // Testing desktop version of the Login page
    browser
      .url(browser.globals.devServerURL)
      .maximizeWindow()
      .pause(500)
      .assert.elementCount('body', 1, 'We have only 1 body element')
      .assert.elementPresent('.login-page', 'Login Page loaded')
      .assert.elementPresent('input[name=username]', 'Input "Username" field is present')
      .assert.elementPresent('input[name=password]', 'Input "Password" field is present')
      .assert.elementPresent('input[type=checkbox][name=rememberMe]', '"Remember Me" checkbox is present')
      .assert.elementPresent('button.login-button', 'Sign In button is present')
      .end()
  }
}
