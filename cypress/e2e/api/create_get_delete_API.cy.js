import {requestBody} from "../../support/commands"
import {checkBodyData} from "../../pages/users"

var creds = requestBody();

describe('Create, get and delete a user via API', () => {

    it('Create, get and delete a user using REST cURL*', () => {
        cy.createUser(creds1)
        cy.get('@userCreate').its('body')
            .then((response) => {
                var userId = response.id
                checkBodyData.property().isCorrect(userId, creds)
                cy.deleteUser(userId)
                cy.get('@deleteUser').its('status').should('be.eq', 204)
                cy.getUser(userId).its('body').then((notFound) => {
                    expect(notFound).to.have.property("message", "Resource not found")
                    cy.getUser(userId).its('status').should('be.eq', 404)
                })
            })
    })
});