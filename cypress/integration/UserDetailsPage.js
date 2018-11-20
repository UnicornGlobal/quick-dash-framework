describe('User Details Page', function() {
  before(function () {
    cy.reload(true)
    cy.loginXhr('admin', 'admin')
    cy.visit('/users')
  })

  beforeEach(function () {
    cy.server()
    let url = Cypress.env('apiUrl')
    cy.route(url + '/api/admin/roles').as('getRoles')
    cy.loginXhr('admin', 'admin')
  })

  it('Loads All Users List Page as Admin', function() {
    cy.url().should('not.include', '/login')
    cy.url().should('include', '/users')
    cy.get('h2').contains('All Users')
  })

  it('Loads Admin Test User', function () {
    cy.get('a.list-row')
      .children('.list-row-field')
      .children('div')
      .contains('Admin User')
      .parent()
      .parent()
      .click()

    cy.url().should('include', '/user')
    cy.get('h2').contains('User Details')
  })

  it('Has correct Page Sections', function() {
    cy.get('.page-section')
      .should('have.length', 2)

    cy.get('h3').contains('User Details')
    cy.get('h3').contains('User Roles')
  })

  it('Has an Assign Role button', function () {
    cy.get('button')
      .should('exist')
      .should('have.attr', 'type', 'submit')
      .should('have.class', 'button-main')
      .contains('Add Role')
  })

  it('Opens the Assign Roles modal', function () {
    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-wrapper').should('not.exist')

    cy.get('button')
      .should('exist')
      .should('have.attr', 'type', 'submit')
      .should('have.class', 'button-main')
      .contains('Add Role')
      .click()

    cy.wait('@getRoles')

    cy.get('.modal-mask').should('exist').and('be.visible')
    cy.get('.modal-wrapper').should('exist').and('be.visible')

    cy.get('input[type="radio"]').should('exist').and('be.visible')
  })

  it('Closes the Assign Role modal on the top right', function () {
    cy.get('h5').contains('Assign Roles')
      .parent()
      .parent()
      .children('.close')
      .click()

    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-container').should('not.exist')
  })

  it('Has Revoke Role button', function () {
    cy.get('a').should('exist')
      .and('have.class', 'btn')
      .contains('Revoke')
  })

  it('Opens the Revoke Role modal', function () {
    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-wrapper').should('not.exist')

    cy.get('a').should('exist')
      .and('have.class', 'btn')
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
      .should('have.attr', 'type', 'button')
      .should('have.class', 'button-alert')

    cy.get('div.modal-footer > .text-right')
      .children('button')
      .should('have.attr', 'type', 'button')
      .should('have.class', 'button-positive')
      .children('span')
      .contains('Ok')
  })

  it('Cancels the Revoke Role Modal with the Button', function () {
    cy.get('.modal-mask').should('exist')
    cy.get('.modal-container').should('exist')

    cy.get('.modal-footer > .text-right > button.button-alert').click().wait(100)
    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-container').should('not.exist')
  })

  it('Reopens the Revoke Role modal', function () {
    cy.get('.modal-mask').should('not.exist')
    cy.get('.modal-wrapper').should('not.exist')

    cy.get('a').should('exist')
      .and('have.class', 'btn')
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
