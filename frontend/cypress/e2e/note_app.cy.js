describe('Quotelist app', function() {

  beforeEach(function() {
    cy.visit('http://localhost:5174')
  })

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3020/api/testing/reset') // change the port number if necessary
    const user = {
      name: 'test',
      username: 'test',
      password: '1234'
    }
    cy.request('POST', 'http://localhost:3020/api/users/', user) 
    cy.visit('http://localhost:5174')
  })

  it('front page can be opened', function() {
    cy.contains('Quotelist')
  })

  it('login form can be clicked', function() {
    cy.contains('log in').click()
  })

  it('user can login', function () {
    cy.get('#login-username-input').type('test')
    cy.get('#login-password-input').type('1234')
    cy.contains('log in').click()
  
    cy.contains('Hello test')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#login-username-input').type('test')
      cy.get('#login-password-input').type('1234')
      cy.contains('log in').click()
    })

    it('a new quote can be created', function() {
      cy.get('.add-quote .quote-title').type('a quote')
      cy.get('.add-quote .quote-author').type('cypress')
      cy.contains('Add new quote').click()
      cy.contains('a quote by cypress')
      cy.contains('view').click()
      cy.contains('delete').click()
    })
  })
  
  it('login fails with wrong password', function() {
    cy.get('#login-username-input').type('test')
    cy.get('#login-password-input').type('WRONG PASSWORD')
    cy.contains('log in').click()

    cy.contains('Wrong credentials')
  })
})