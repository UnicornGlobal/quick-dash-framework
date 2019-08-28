describe('Admin Home', function() {
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

  it('Logs in behind the scenes', function() {
    cy.url().should('not.include', '/login')
    cy.get('.logo').should('exist')
  })

  it('Has a Sidebar', function () {
    cy.get('.side-bar').should('exist')
  })

  it('The correct Menu Item is highlighted', function () {
    cy.get('a.router-link-active')
      .should('exist')
      .and('have.class', 'router-link-active')
      .and('have.class', 'router-link-exact-active')
      .contains('Home')
  })
})
