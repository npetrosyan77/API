import {requestBody} from "../../support/commands"

var creds = requestBody();
var creds1 = requestBody();


describe('Create a user via API', () => {

    it('Create a user with REST cURL', () => {
        cy.createUser(creds)
        cy.get('@userCreate').then((createdUser) => {
            expect(createdUser.status).to.eq(201)
        })
    })


    it('Create a user with the same credentials twice', () => {
        cy.createUser(creds1).its('body')
            .then((response) => {
                var userId = response.id
                cy.createUser(creds1)
                cy.get('@userCreate').its('status').should('be.eq', 422)
                cy.get('@userCreate').its('body').then((responseBody) => {
                    expect(responseBody[0].message).contains('has already been taken')
                })
                cy.deleteUser(userId).its('status').should('be.eq', 204)
            })
    })
})