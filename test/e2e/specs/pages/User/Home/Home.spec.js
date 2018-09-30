// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'User Home Page': function (browser) {
    // logging in
    browser
      .url(browser.globals.devServerURL)
      .maximizeWindow()
      .setValue('input[name=username]', 'admin')
      .setValue('input[name=password]', 'admin')
      .click('button')
      .waitForElementVisible('div[class="home-page content-area"]', 30000, 'Arrive on the home page')

      .assert.elementPresent('.top-navigation', 'Navbar is present')
      .assert.elementPresent('.side-bar', 'Sidebar is present')

      .pause(1000)
      .click('a.toggle')
      .assert.cssProperty('div[class="sub-menu"]', 'display', 'block', 'SideBar sub-section is expanded after click')
      .assert.elementPresent('div[class="user-menu"]', 'User menu is present')
      .assert.elementPresent('div[class="tip-section"]', 'Tip section is present')
      .useXpath()
      .useCss()
      .assert.elementPresent('div[class="summary"]', 'Summary section is present')

      .useXpath()
      .end()
  }
}
