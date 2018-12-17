describe('User Home', function() {
  before(function () {
    cy.reload(true)
  })

  beforeEach(function () {
    cy.loginXhr('user', 'password')
    cy.location('href').then((address) => {
      if (address !== `${Cypress.config().baseUrl}/`) {
        cy.visit('/')
        console.log(address)
      }
    })
  })

  it('Logs in', function() {
    cy.url().should('not.include', '/login')
  })

  it('Has a Sidebar', function () {
    cy.get('.side-bar').should('exist')
  })

  it('Is the Generic Homepage', function () {
    cy.get('h5').contains('Tips Widget Output')
  })

  it('Has the My Account button', function () {
    cy.get('a.call-to-action-link').contains('My Account').click()
    cy.url().should('include', '/account')
  })
})
