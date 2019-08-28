describe('Login', function() {
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

  it('Has the correct Header elements', () => {
    cy.get('div.login-header').children('div').should('have.class', 'logo')
  })

  it('Has the correct Input elements', () => {
    cy.get('div.login-form > div.card > form')
      .should('exist')
      .children()
      .should('have.length', 3)
      .first()
      .children('label')
      .should('have.class', 'required')
      .contains('Email')
      .parent()
      .children('input')
      .should('be.empty')
      .should('be.visible')
      .should('have.attr', 'type', 'text')
      .should('have.attr', 'name', 'username')
      .parent()
      .next()
      .children('label')
      .should('have.class', 'required')
      .contains('Password')
      .parent()
      .should('have.class', 'password-reset-container')
      .children('div')
      .should('have.class', 'password-box')
      .children('input')
      .should('be.empty')
      .should('be.visible')
      .should('have.attr', 'type', 'password')
      .should('have.attr', 'name', 'password')
  })

  it('Has a checked Remember Me checkbox', () => {
    cy.get('input[type="checkbox"]').should('have.attr', 'value', 'true').and('be.visible')

    cy.get('label').contains('Remember Me').and('be.visible')
  })

  it('Has a Submit button', () => {
    cy.get('div.login-button-wrapper > button.login-button')
      .contains('Sign In')
      .and('be.visible')
  })

  it('Rejects completely empty submission', () => {
    cy.reload(true)

    cy.get('span.validation-error')
      .should('not.exist')

    cy.get('input[name="username"]').type('{selectall}{backspace}').wait(10)
    cy.get('input[name="password"]').type('{selectall}{backspace}').wait(10)

    cy.get('button').click()

    cy.get('span.validation-error')
      .should('exist')
      .should('have.length', 2)
      .first()
      .contains('The username field is required')

    cy.get('span.validation-error')
      .last()
      .contains('The password field is required')
  })

  it('Rejects empty Password submission', () => {
    cy.reload(true)

    cy.get('span.validation-error')
      .should('not.exist')

    cy.get('input[name="username"]').type('{selectall}{backspace}username').wait(10)
    cy.get('input[name="password"]').type('{selectall}{backspace}').wait(10)
    cy.get('input[name="password"]').type(' ').type('{backspace}').wait(10)

    cy.get('button').click()

    cy.get('span.validation-error')
      .should('exist')
      .should('have.length', 1)
      .contains('The password field is required')
  })

  it('Rejects empty Username submission', () => {
    cy.reload(true)

    cy.get('span.validation-error')
      .should('not.exist')

    cy.get('input[name="username"]').type('{selectall}{backspace}').wait(10)
    cy.get('input[name="username"]').type(' ').type('{backspace}').wait(10)
    cy.get('input[name="password"]').type('{selectall}{backspace}password').wait(10)

    cy.get('button').click()

    cy.get('span.validation-error')
      .should('exist')
      .should('have.length', 1)
      .contains('The username field is required')
  })

  it('Bad Username and Password', () => {
    cy.server({ status: 401 })
    let url = Cypress.env('apiUrl')

    cy.reload(true)

    cy.get('span.validation-error')
      .should('not.exist')

    cy.get('input[name="username"]')
      .focus()
      .should('be.empty')
      .type('username')

    cy.get('input[name="password"]')
      .focus()
      .should('be.empty')
      .type('password')

    cy.get('button').focus().click()

    cy.get('span.validation-error')
      .should('exist')
      .contains('Invalid username or password')
  })

  it('Valid Admin Username and Password (Remember)', () => {
    cy.reload(true)
    cy.clearCookies()

    cy.get('span.validation-error')
      .should('not.exist')

    cy.get('input[name="username"]')
      .focus()
      .type('admin')

    cy.get('input[name="password"]')
      .focus()
      .type('admin')

    cy.get('button').focus().click()

    cy.get('span.validation-error')
      .should('not.exist')

    cy.url().should('not.include', '/login')
    cy.getCookie('rememberMe').should('exist').should('be', 'true')
    cy.visit('/')
    cy.wait('@getAdminMe')
    cy.url().should('not.include', '/login')
  })

  it('Valid Admin Username and Password (Do Not Remember)', () => {
    cy.reload(true)
    cy.clearCookies()

    cy.get('span.validation-error')
      .should('not.exist')

    cy.get('input[name="username"]')
      .focus()
      .type('admin')

    cy.get('input[name="password"]')
      .focus()
      .type('admin')

    cy.get('input[type="checkbox"]').click()

    cy.get('button').focus().click()

    cy.get('span.validation-error')
      .should('not.exist')

    cy.url().should('not.include', '/login')
    cy.getCookie('rememberMe').should('exist').should('be', 'false')
    cy.visit('/')
    cy.wait('@getAdminMe')
    cy.url().should('not.include', '/login')
  })

  it('Handles Logout', () => {
    cy.reload()
    cy.visit('/')

    cy.get('span.validation-error')
      .should('not.exist')

    cy.get('input[name="username"]')
      .focus()
      .type('admin')

    cy.get('input[name="password"]')
      .focus()
      .type('admin')

    cy.get('button').focus().click()

    cy.get('span.validation-error')
      .should('not.exist')

    cy.url().should('not.include', '/login')
    cy.getCookie('rememberMe').should('exist').should('be', 'true')
    cy.wait('@getAdminMe')

    cy.visit('/logout')
    cy.url().should('include', '/login')
  })
})
