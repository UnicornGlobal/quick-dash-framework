describe('Admin Navigation', function() {
  before(function () {
    cy.reload(true)
  })

  beforeEach(function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.loginXhr('admin', 'admin')
    cy.location('href').then((address) => {
      if (address !== `${Cypress.config().baseUrl}/`) {
        cy.visit('/')
      }
    })
  })

  it('Has Clickable Logo', function () {
    cy.get('.logo').should('exist').and('be.visible')
      .children('a')
      .should('exist').and('be.visible')
      .and('have.attr', 'href', '/')
  })

  it('Has correct Side Bar', function () {
    cy.get('.side-bar').should('exist').and('be.visible')

    cy.get('.menu-items')
      .children('div')
      .should('have.length', 4)

    cy.get('.menu-items')
      .children('.menu-item')
      .first()
      .should('have.class', 'active')

    cy.get('.menu-item').contains('Products')
    cy.get('.menu-item').contains('Frames')
    cy.get('.menu-item').contains('Users')
  })

  it('Has correct User Info box', function() {
    cy.get('.user-menu').should('exist').and('be.visible')
      .children()
      .first().should('have.class', 'user-avatar')
      .next().should('have.class', 'user-details')

    cy.get('.user-menu')
      .children()
      .first()
      .children()
      .first()
      .should('have.class', 'avatar')

    cy.get('.user-menu')
      .children()
      .last()
      .children()
      .first()
      .should('have.class', 'user-name')
      .contains('Admin User')

    cy.get('.user-menu')
      .children()
      .last()
      .children()
      .last()
      .should('have.class', 'logout-button-box')
      .children('a')
      .first()
      .should('have.class', 'logout-button')
      .contains('Logout')
  })

  it('Navigates to different Pages', function () {
    cy.get('a[href="/products"]').click()
    cy.url().should('include', '/products')
    cy.go('back')
    cy.url().should('be', '/')

    cy.get('a[href="/frames"]').click()
    cy.url().should('include', '/frames')
    cy.go('back')
    cy.url().should('be', '/')

    cy.get('a[href="/users"]').click()
    cy.url().should('include', '/users')
    cy.go('back')
    cy.url().should('be', '/')
  })

  it('Navigate home via Logo', function () {
    cy.visit('/frames')
    cy.get('.logo').should('exist').and('be.visible')
      .children('a')
      .click()

    cy.url().should('be', '/')
  })
})
