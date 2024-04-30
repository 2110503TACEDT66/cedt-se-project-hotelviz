const { exists } = require("../../backend/models/User")

describe('Redeem coupon test', () => {
  it('Redeem coupon', () => {
    cy.visit('http://localhost:3000/')
    cy.get('[data-testid="Sign-In"]').click()
    cy.get('input[name="email"]').type('Punyisa@gmail.com')
    cy.get('input[name="password"]').type("asdfghjkl;'")
    cy.get('button[type="submit"]').click()

    cy.get('[href="/member"]').click()

    // let elementText;
    // cy.get(':nth-child(4) > .overflow-x-auto > :nth-child(1) > .text-2xl').invoke('text').then($text => {
    //   elementText = $text;
    //   console.log(elementText);
    // })

    cy.get(':nth-child(1) > .justify-between > .flex-col > .flex > .bg-gradient-to-r').click()

    // cy.get('.px-28 > :nth-child(3)')
    //   .children().find('.text-2xl')
    //   .should('contain', "DewandKongkongandBook")
  })


})
