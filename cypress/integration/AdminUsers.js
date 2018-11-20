describe('Admin Users List', function() {
  before(function () {
    cy.reload(true)
  })

  beforeEach(function () {
    cy.loginXhr('admin', 'admin')
    cy.location('href').then((address) => {
      if (address !== `${Cypress.config().baseUrl}/users`) {
        cy.visit('/users')
        console.log(address)
      }
    })
  })

  it('Loads All Users List Page', function() {
    cy.url().should('not.include', '/login')
    cy.url().should('include', '/users')
    cy.get('h2').contains('All Users')
  })

  it('Has a Sidebar', function () {
    cy.get('.side-bar').should('exist')
  })

  it('The correct Menu Item is highlighted', function () {
    cy.get('a[href="/users"]')
      .should('exist')
      .and('have.class', 'router-link-active')
      .and('have.class', 'router-link-exact-active')
      .contains('Users')
  })

  it('Has a DataTable', function() {
    cy.get('.table-card')
      .should('exist')
      .should('be.visible')
      .children('div')
      .should('have.class', 'data-table')
  })

  it('Has a Search First Names', function () {
    cy.get('input[placeholder="Search First Names"]')
      .should('exist')
      .should('be.visible')

    cy.get('.no-results').should('not.exist')
  })

  it('Has Table Headers', function () {
    cy.get('div.header-bar')
      .children('div.headers')
      .should('exist')
      .should('be.visible')
      .children()
      .contains('Name')

    cy.get('div.header-bar')
      .children('div.headers')
      .children()
      .contains('Email')

    cy.get('div.header-bar')
      .children('div.headers')
      .children()
      .contains('Verified')

    cy.get('div.header-bar')
      .children('div.headers')
      .children()
      .contains('Confirmed')

    cy.get('.header-cell')
      .should('have.length', 4)

    cy.get('.empty-header-cell')
      .should('have.length', 0)
  })

  it('Has a Gap between Table Controls and Table Headers', function () {
    cy.get('.gapped').should('exist').and('be.visible')
  })

  it('Has a Table Body', function () {
    cy.get('div.list').should('exist').and('be.visible')
      .children('div').should('exist').and('be.visible')
      .children('a.list-row').should('exist').and('be.visible')
  })

  it('Table Rows are correctly configured', function () {
    cy.get('a.list-row')
      .first()
      .should('exist').and('be.visible')
      .children('div.list-row-field')
      .should('have.length', 4)
      .first()
      .children('div')
      .should('have.class', 'name')
      .parent()
      .next()
      .children()
      .should('have.class', 'email')
      .parent()
      .next()
      .children()
      .should('have.class', 'is_verified')
      .parent()
      .next()
      .children()
      .should('have.class', 'confirmed')
  })

  it('Has an Add User button', function () {
    cy.get('button').should('exist')
      .and('have.class', 'button-main')
      .contains('Add User')
  })

  it('Handles an empty Search', function () {
    cy.get('input[placeholder="Search First Names"')
      .focus()
      .type('xxxx')
      .wait(10)

    cy.get('.no-results').should('exist')
      .contains('No Users Found')

    cy.get('input[placeholder="Search First Names"')
      .focus()
      .type('{selectall}{backspace}')
      .wait(10)

    cy.get('.no-results').should('not.exist')
  })

  it('Has an Include Not Confirmed checkbox', function() {
    cy.get('label')
      .contains('Include Not Confirmed')
      .children('input')
      .first()
      .should('have.attr', 'type', 'checkbox')
  })

  it('Has an Include Not Verified checkbox', function() {
    cy.get('label')
      .contains('Include Not Verified')
      .children('input')
      .first()
      .should('have.attr', 'type', 'checkbox')
  })
})
