// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'Tablet version of the Home page': function (browser) {
    // logging in
    browser
      .url(browser.globals.devServerURL)
      .maximizeWindow()
      .setValue('input[name=username]', 'user')
      .setValue('input[name=password]', 'user')
      .click('button')
      .waitForElementVisible('div[class="home-page content-area"]', 30000, 'Arrive on the home page')
      .resizeWindow(1000, 1200)

      .assert.cssProperty('div.side-bar', 'display', 'none', 'Sidebar is hidden')
      .click('div[class="menu-toggle"]')
      .assert.elementPresent('div[class="menu-item"]', 'Sidebar is visible after toggle')

      // Check if SideBar sub-menu is expandable
      .assert.cssProperty('div[class="sub-menu"]', 'display', 'none', 'Sidebar subsection is collapsed')
      .click('a.toggle')
      .assert.elementPresent('a[class="router-link"]', 'Sidebar subsection is expanded after click')
      .click('a.toggle')
      .pause(2500)
      .click('a.toggle')
      .click('div[class="menu-toggle"]')
      .end()
  }
}
