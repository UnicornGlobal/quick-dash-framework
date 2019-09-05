describe('Admin Tablet Navigation', function() {
  before(function () {
    cy.reload(true)
    cy.loginXhr('admin', 'admin')
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.visit('/')
  })

  // Stub the thumbnail responses
  beforeEach(function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.loginXhr('admin', 'admin')
    cy.viewport('ipad-mini')
    cy.visit('/')
    cy.wait(50)
  })

  it('Has a Side Bar hamburger button', function () {
    cy.wait(500)
    cy.get('.menu-toggle').should('exist').and('be.visible')
  })

  it('Opens and closes the Side Bar', function () {
    cy.get('.menu-toggle').click()
    cy.get('.shadow').should('exist').and('be.visible')
    cy.get('.shadow').click({force:true})
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

    cy.get('.menu-item').contains('Dashboard').and('be.visible')
    cy.get('.menu-item').contains('Account').and('be.visible')
    cy.get('.menu-item').contains('Admin Account').and('be.visible')
  })

  it('Has the Logout link in the Side Bar', function() {
    cy.get('.menu-toggle').click()

    cy.get('.logout-link-menu-item')
      .should('exist')
      .children('.menu-item')
      .should('exist')
      .children('a')
      .should('exist')
      .contains('Logout')

    cy.get('.shadow').click({force:true})
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
    cy.get('.mobile-logo').should('exist').and('be.visible')
      .click()

    cy.url().should('be', '/')
  })
})

