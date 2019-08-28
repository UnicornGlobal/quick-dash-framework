describe('Forgot Password', function() {
  beforeEach(function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.fixture('admin-me').then((json) => {
      cy.route(url + '/api/me', json).as('getAdminMe')
    })
  })

  it('Redirect to Login Page', function() {
    cy.reload(true)
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.visit('/')
    cy.url().should('include', '/login')
    cy.getCookie('rememberMe').should('not.exist')
  })

  it('Has a Forgot Password link', () => {
    cy.get('div.login-form')
      .children('div')
      .children('form')
      .children()
      .next()
      .should('have.class', 'password-reset-container')
      .children('div')
      .should('have.class', 'password-box')
      .children('a')
      .contains('Forgot')
      .should('be.visible')
      .should('have.attr', 'href', '/password-reset')
  })

  it('Handles Forgot Password link', () => {
    cy.get('div.login-form')
      .children('div')
      .children('form')
      .children()
      .next()
      .should('have.class', 'password-reset-container')
      .children('div')
      .should('have.class', 'password-box')
      .children('a')
      .contains('Forgot')
      .should('be.visible')
      .should('have.attr', 'href', '/password-reset')
      .click()

    cy.url().should('not.include', '/login')
    cy.url().should('include', '/password-reset')

    cy.get('h2').contains('Forgot Password')
    cy.get('input[name="email"]').should('exist')

    cy.get('button').click()

    cy.get('span.validation-error')
      .should('exist')
      .should('have.length', 1)
      .first()
      .contains('The email field is required')

    cy.get('input[name="email"]').type('{selectall}{backspace}me@you.com')

    cy.get('button').click()

    cy.get('span.validation-error')
      .should('exist')
      .should('have.length', 1)
      .first()
      .contains('A user with that email address does not exist')

    cy.get('input[name="email"]').type('{selectall}{backspace}admin@example.com')

    cy.get('button').click()

    cy.get('p.sent-success').contains('Check your inbox for more info')

    cy.visit('/')
  })
})
