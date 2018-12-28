describe('Make a User a Developer', function() {
  before(function () {
    cy.reload(true)
  })

  beforeEach(function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.route(url + '/api/admin/roles').as('getRoles')
    cy.loginXhr('admin', 'admin')
  })

  it('Loads All Users List Page as Admin', function() {
    cy.visit('/admin/users')
    cy.url().should('not.include', '/login')
    cy.url().should('include', '/users')
    cy.get('h2').contains('All Users')
  })

  it('Loads a Non Admin User', function () {
    cy.visit('/admin/users')

    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/user')
    cy.get('span.role-name').contains('developer').should('not.exist')
  })

  it('Logout from Admin account', function () {
    cy.get('a.logout-button').click()
  })

  it('Login as User', function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.route(url + '/api/me').as('getUserMe')

    cy.loginXhr('user', 'password')
    cy.visit('/')
    cy.wait('@getUserMe')

    cy.get('h1').contains('Welcome to Quick Dash!')
  })

  it('Login as Admin User again', function () {
    cy.visit('/admin/users')

    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/user')
  })

  it('Opens User Roles modal', function () {
    cy.get('span.role-name').contains('developer').should('not.exist')

    cy.get('button').should('exist')
      .contains('Add Role')
      .click()

    cy.wait('@getRoles')

    cy.get('.modal-mask').should('exist').and('be.visible')
    cy.get('.modal-wrapper').should('exist').and('be.visible')
  })

  it('Assigns the Developer role to the User', function () {
    cy.get('button.button-positive').should('not.exist')

    cy.get('span')
      .contains('developer')
      .siblings('span')
      .should('have.class', 'radiomark')
      .siblings('input')
      .should('have.attr', 'type', 'radio')
      .click()

    cy.get('button').contains('Assign')
      .should('exist').and('be.visible')

    cy.get('button').contains('Assign').click()

    cy.get('span')
      .contains('developer')
      .should('not.exist')
  })

  it('Confirm User is a Developer', function () {
    cy.loginXhr('user', 'password')
    cy.visit('/')
    cy.get('.side-bar').should('exist')
    cy.get('h1').contains('Welcome to Quick Dash!')
  })

  it('Revoke Developer role', function () {
    cy.visit('/admin/users')

    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/admin/users/')

    cy.get('span.role-name')
      .contains('developer')
      .parent('li')
      .should('have.class', 'user-role')
      .children('div')
      .should('have.class', 'wrapper')
      .children('a')
      .click()

    cy.get('button.ok-button').click()

    cy.wait(100)

    cy.get('span.role-name')
      .contains('developer')
      .should('not.exist')
  })
})
