describe('Make a User an Admin', function() {
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
    cy.visit('/users')
    cy.url().should('not.include', '/login')
    cy.get('h2').contains('All Users')
  })

  it('Loads a Non Admin Test User', function () {
    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('Test User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/users/')
  })

  it('User does not have Admin role', function () {
    cy.get('span.role-name').contains('admin').should('not.exist')
  })

  it('Logout from Admin account', function () {
    cy.get('a.logout-button').click()
  })

  it('Login as Test User', function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.route(url + '/api/me').as('getUserMe')

    cy.loginXhr('user', 'password')
    cy.visit('/')
    cy.wait('@getUserMe')

    cy.get('h5').contains('Tips Widget Output')
  })

  it('Tries to visit User Admin page and fails', function () {
    cy.loginXhr('user', 'password')
    cy.visit('/users')
    cy.get('h2').should('not.exist')
    cy.get('.side-bar').should('not.exist')
  })

  it('Login as Admin User again', function () {
    cy.visit('/users')

    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('Test User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/user')
  })

  it('Opens Test User Roles modal', function () {
    cy.get('span.role-name').contains('ADMIN').should('not.exist')

    cy.get('button').should('exist')
      .and('have.class', 'button-main')
      .contains('Add Role')
      .click()

    cy.wait('@getRoles')

    cy.get('.modal-mask').should('exist').and('be.visible')
    cy.get('.modal-wrapper').should('exist').and('be.visible')
  })

  it('Assigns the Admin role to Test User', function () {
    cy.get('button.button-positive').should('not.exist')

    cy.get('span')
      .contains('admin')
      .siblings('span')
      .should('have.class', 'radiomark')
      .siblings('input')
      .should('have.attr', 'type', 'radio')
      .click()

    cy.get('button.button-positive').contains('Assign')
      .should('exist').and('be.visible')

    cy.get('button.button-positive').contains('Assign').click()

    cy.get('span')
      .contains('admin')
      .should('not.exist')
  })

  it('Login as Test User with new Admin role', function () {
    cy.loginXhr('user', 'password')
    cy.visit('/')

    cy.get('.side-bar').should('exist').and('be.visible')

    cy.get('a.router-link-active')
      .should('exist')
      .and('have.class', 'router-link-active')
      .and('have.class', 'router-link-exact-active')
      .contains('Orders')
  })

  it('Successfully visits the Users page', function () {
    cy.loginXhr('user', 'password')
    cy.visit('/users')
    cy.url().should('include', '/users')
    cy.url().should('not.include', '/login')
  })

  it('Opens own User Details', function () {
    cy.loginXhr('user', 'password')
    cy.visit('/users')

    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('Test User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/users/')
  })

  it('Revokes own Admin role', function () {
    cy.loginXhr('user', 'password')

    cy.get('span.role-name')
      .contains('admin')
      .parent('li')
      .should('have.class', 'user-role')
      .children('div')
      .should('have.class', 'wrapper')
      .children('a')
      .should('have.class', 'btn')
      .click()

    cy.get('.modal-footer > .text-right > button.button-positive').click()

    cy.get('span.role-name')
      .contains('admin')
      .should('not.exist')
  })

  it('Tries to visit User Admin page again and fails', function () {
    cy.loginXhr('user', 'password')
    cy.visit('/users')
    cy.get('h2').should('not.exist')
    cy.get('.side-bar').should('not.exist')
  })
})
