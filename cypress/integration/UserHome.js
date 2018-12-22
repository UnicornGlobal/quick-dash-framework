describe('User Home', function() {
  before(function () {
    cy.reload(true)
  })

  beforeEach(function () {
    cy.loginXhr('user', 'password')
    cy.location('href').then((address) => {
      if (address !== `${Cypress.config().baseUrl}/`) {
        cy.visit('/')
      }
    })
  })

  it('Logs in', function() {
    cy.url().should('not.include', '/login')
  })

  it('Has a Sidebar', function () {
    cy.get('.side-bar').should('exist')
  })
})
