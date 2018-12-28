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
      .and('have.attr', 'href', '/')
  })

  it('Has correct Side Bar', function () {
    cy.get('.side-bar').should('exist').and('be.visible')

    cy.get('.menu-items')
      .children('div')
      .should('have.length', 3)

    cy.get('.menu-items')
      .children('.menu-item')
      .first()
      .should('have.class', 'active')

    cy.get('.menu-item').contains('Account')
    cy.get('.menu-item').contains('Admin Account')
    cy.get('.menu-item').contains('Home')
  })

  it('Has correct User Profile box', function() {
    cy.get('.user-profile').should('exist').and('be.visible')
    cy.get('.user-profile > h4')
      .contains('Admin User')
      .should('exist').and('be.visible')
    cy.get('.user-profile > h5')
      .contains('admin@example.com')
      .should('exist').and('be.visible')

    cy.get('.user-profile > .profile-avatar > div')
      .should('have.class', 'avatar')
      .and('be.visible')

    cy.get('div.user-details > div > a')
      .should('have.class', 'logout-button')
      .contains('Logout')
  })

  it('Navigates to different Pages', function () {
    cy.get('a.router-link[href="/account"]').click()
    cy.url().should('include', '/account')
    cy.go('back')
    cy.url().should('be', '/')

    cy.get('.router-link.toggle').click()

    cy.get('a[href="/admin/users"]').click()
    cy.url().should('include', '/users')
    cy.go('back')
    cy.url().should('be', '/')
  })

  it('Navigate home via Logo', function () {
    cy.visit('/account')
    cy.get('.logo').should('exist').and('be.visible').click()
    cy.url().should('be', '/')
  })
})
