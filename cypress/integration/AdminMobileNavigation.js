describe('Admin Mobile Navigation', function() {
  before(function () {
    cy.reload(true)
  })

  beforeEach(function () {
    cy.viewport('iphone-6')
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.loginXhr('admin', 'admin')
    cy.location('href').then((address) => {
      if (address !== `${Cypress.config().baseUrl}/`) {
        cy.visit('/')
        cy.wait(50)
      }
    })
  })

  it('Has Clickable Logo', function () {
    cy.get('.logo').should('exist').and('be.visible')
      .and('have.attr', 'href', '/')
  })

  it('Has a hidden Side Bar', function () {
    cy.get('.shadow').should('exist').and('not.be.visible')
    cy.get('.side-bar').should('exist').and('not.be.visible')
  })

  it('Has a Side Bar hamburger button', function () {
    cy.get('.menu-toggle').should('exist').and('be.visible')
  })

  it('Opens and closes the Side Bar', function () {
    cy.get('.menu-toggle').click()
    cy.get('.shadow').should('exist').and('be.visible')
    cy.get('.menu-toggle').click()
    cy.get('.shadow').should('exist').and('not.be.visible')
  })

  it('Opens and closes the Side Bar Admin folder', function () {
    cy.get('.menu-toggle').click()

    cy.get('.router-link.toggle').should('exist').and('be.visible')
      .click()

    cy.get('.menu-item > a.router-link[href="/admin/users"]').should('exist').and('be.visible')

    cy.get('.router-link.toggle').should('exist').and('be.visible')
      .click()

    cy.get('.menu-item > a.router-link[href="/admin/users"]').should('exist').and('not.be.visible')
  })

  it('Has a the correct Side Bar links', function () {
    cy.get('.menu-toggle').click()
    cy.get('.shadow').should('exist').and('be.visible')

    cy.get('.menu-items')
      .children('div')
      .should('have.length', 3)
      .and('be.visible')

    cy.get('.menu-items')
      .children('.menu-item')
      .first()
      .should('have.class', 'active')
      .and('be.visible')

    cy.get('.menu-item').contains('Home').and('be.visible')
    cy.get('.menu-item').contains('Account').and('be.visible')
    cy.get('.menu-item').contains('Admin Account').and('be.visible')
  })

  it('Does not have the User Info box', function() {
    cy.get('.user-menu').should('exist').and('not.be.visible')
  })

  it('Has the Logout link in the Side Bar', function() {
    cy.get('.menu-toggle').click()

    cy.get('.logout-link-menu-item')
      .should('exist')
      .and('be.visible')
      .children('.menu-item')
      .should('exist').and('be.visible')
      .children('a')
      .should('exist').and('be.visible')
      .contains('Logout')

    cy.get('.menu-toggle').click().wait(50)
  })

  it('Navigates between Pages', function () {
    cy.get('.menu-toggle').click().wait(50)
    cy.get('a.router-link[href="/account"]').click().wait(50)
    cy.url().should('include', '/account')

    cy.get('.menu-toggle').click().wait(50)
    cy.get('.router-link.toggle').click().wait(50)

    cy.get('a[href="/admin/users"]').click().wait(50)
    cy.url().should('include', 'admin/users')
  })

  it('Navigate home via Logo', function () {
    cy.get('.menu-toggle').click()
    cy.get('a.router-link[href="/account"]').click()
    cy.get('.logo').should('exist').and('be.visible')
      .click()

    cy.url().should('be', '/')
  })
})
