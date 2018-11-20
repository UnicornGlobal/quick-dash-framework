describe('Make a User a Developer', function() {
  before(function () {
    cy.reload(true)
  })

  beforeEach(function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.fixture('admin-all-roles').then((json) => {
      cy.route(url + '/api/admin/roles', json).as('getRoles')
    })
    cy.loginXhr('admin', 'admin')
  })

  it('Loads All Users List Page as Admin', function() {
    cy.visit('/users')
    cy.url().should('not.include', '/login')
    cy.url().should('include', '/users')
    cy.get('h2').contains('All Users')
  })

  it('Loads a Non Admin Courier User', function () {
    cy.visit('/users')

    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('Courier User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/user')
    cy.get('span.role-name').contains('developer').should('not.exist')
  })

  it('Logout from Admin account', function () {
    cy.get('a.logout-button').click()
  })

  it('Login as Courier User', function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.fixture('user-me').then((json) => {
      cy.route(url + '/api/me', json).as('getUserMe')
    })

    cy.loginXhr('courier', 'courier')
    cy.visit('/')
    cy.wait('@getUserMe')

    cy.get('h5').contains('Tips Widget Output')
  })

  it('Login as Admin User again', function () {
    cy.visit('/users')

    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('Courier User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/user')
  })

  it('Opens Courier User Roles modal', function () {
    cy.get('span.role-name').contains('developer').should('not.exist')

    cy.get('button').should('exist')
      .and('have.class', 'button-main')
      .contains('Add Role')
      .click()

    cy.wait('@getRoles')

    cy.get('.modal-mask').should('exist').and('be.visible')
    cy.get('.modal-wrapper').should('exist').and('be.visible')
  })

  it('Assigns the Developer role to the Courier User', function () {
    cy.get('button.button-positive').should('not.exist')

    cy.get('span')
      .contains('developer')
      .siblings('span')
      .should('have.class', 'radiomark')
      .siblings('input')
      .should('have.attr', 'type', 'radio')
      .click()

    cy.get('button.button-positive').contains('Assign')
      .should('exist').and('be.visible')

    cy.get('button.button-positive').contains('Assign').click()

    cy.get('span')
      .contains('developer')
      .should('not.exist')
  })

  it('Confirm Courier User is a Developer', function () {
    cy.loginXhr('courier', 'courier')
    cy.visit('/')
    cy.get('.side-bar').should('exist')
    cy.get('h5').contains('Tips Widget Output')
  })

  it('Revoke Developer role', function () {
    cy.visit('/users')

    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('Courier User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/users/')

    cy.get('span.role-name')
      .contains('developer')
      .parent('li')
      .should('have.class', 'user-role')
      .children('div')
      .should('have.class', 'wrapper')
      .children('a')
      .should('have.class', 'btn')
      .click()

    cy.get('.modal-footer > .text-right > button.button-positive').click()

    cy.get('span.role-name')
      .contains('developer')
      .should('not.exist')
  })
})
