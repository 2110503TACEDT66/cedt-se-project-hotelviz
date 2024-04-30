describe('template spec', () => {
  it('passes', () => {
    cy.visit('localhost:3000')
    cy.get('[data-testid="Sign-In"]').click()
    cy.get('input[name="email"]').type('winstonscott@gmail.com')
    cy.get('input[name="password"]').type('newpassword')
    cy.get('button[type="submit"]').click()
  })
})