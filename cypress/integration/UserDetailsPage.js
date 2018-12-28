describe('User Details Page', function() {
  before(function () {
    cy.reload(true)
    cy.loginXhr('admin', 'admin')
    cy.visit('/admin/users')
  })

  beforeEach(function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.route(url + '/api/admin/roles').as('getRoles')
    cy.loginXhr('admin', 'admin')
  })

  it('Loads All Users List Page as Admin', function() {
    cy.url().should('not.include', '/login')
    cy.url().should('include', '/admin/users')
    cy.get('h2').contains('All Users')
  })

  it('Loads Admin Test User', function () {
    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('Admin')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/admin/user')
    cy.get('h2').contains('User Details')
  })

  it('Has correct Page Sections', function() {
    cy.get('.page-section')
      .should('have.length', 2)

    cy.get('h2').contains('User Details')
    cy.get('h2').contains('User Roles')
  })

  it('Has an Assign Role button', function () {
    cy.get('button')
      .should('exist')
      .should('have.attr', 'type', 'submit')
      .contains('Add Role')
  })

  it('Opens the Assign Roles modal', function () {
    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-wrapper').should('not.exist')

    cy.get('button')
      .should('exist')
      .should('have.attr', 'type', 'submit')
      .contains('Add Role')
      .click()

    cy.wait('@getRoles')

    cy.get('.modal-mask').should('exist').and('be.visible')
    cy.get('.modal-wrapper').should('exist').and('be.visible')

    cy.get('input[type="radio"]').should('exist').and('be.visible')
  })

  it('Closes the Assign Role modal on the top right', function () {
    cy.get('h4').contains('Assign Roles')
      .parent()
      .parent()
      .children('.close')
      .click()

    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-container').should('not.exist')
  })

  it('Has Revoke Role button', function () {
    cy.get('a').should('exist')
      .contains('Revoke')
  })

  it('Opens the Revoke Role modal', function () {
    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-wrapper').should('not.exist')

    cy.get('a').should('exist')
      .contains('Revoke')
      .click()

    cy.get('.modal-mask').should('exist').and('be.visible')
    cy.get('.modal-wrapper').should('exist').and('be.visible')

    cy.get('h4').contains('Confirm Action').should('exist').and('be.visible')
  })

  it('Has the correct Buttons', function () {
    cy.get('div.modal-footer > .text-right')
      .children('button')
      .should('have.length', 2)

    cy.get('div.modal-footer > .text-right')
      .children('button')
      .contains('Cancel')

    cy.get('div.modal-footer > .text-right')
      .children('button')
      .contains('Ok')
  })

  it('Cancels the Revoke Role Modal with the Button', function () {
    cy.get('.modal-mask').should('exist')
    cy.get('.modal-container').should('exist')

    cy.get('div.modal-footer > .text-right')
      .children('button')
      .contains('Cancel')
      .click()

    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-container').should('not.exist')
  })

  it('Reopens the Revoke Role modal', function () {
    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-wrapper').should('not.exist')

    cy.get('a').should('exist')
      .contains('Revoke')
      .click()

    cy.get('.modal-mask').should('exist').and('be.visible')
    cy.get('.modal-wrapper').should('exist').and('be.visible')

    cy.get('h4').contains('Confirm Action').should('exist').and('be.visible')
  })

  it('Closes the Revoke Role modal with the Top Right X', function () {
    cy.get('.modal-mask').should('exist')
    cy.get('.modal-container').should('exist')

    cy.get('h4').contains('Confirm Action')
      .parent()
      .parent()
      .children('.close')
      .click()

    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-container').should('not.exist')
  })
})
