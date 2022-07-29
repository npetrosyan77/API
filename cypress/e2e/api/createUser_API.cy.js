import {requestBody} from "../../support/commands"

global.creds1 = requestBody();
global.creds2 = requestBody();

describe('Create a user via API', ()=> {

    it('Create a user with REST cURL', () => {
        cy.request({
            method: 'POST',
            url: 'https://gorest.co.in/public/v2/users',
            body: {
                'name': creds1.name,
                'gender': creds1.gender,
                'email': creds1.email,
                'status': creds1.status
            },
            headers: {
                Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
            }
        }).then((createdUser) => {
            expect(createdUser.status).to.eq(201)
        })
    })

    it('Create a user with the same credentials twice', () => {
        cy.createUser(creds2).its('body')
            .then((response) => {
                var userId = response.id
                cy.createUser(creds2)
                cy.get('@userCreate').its('status').should('be.eq', 422)
                cy.get('@userCreate').its('body').then((responseBody) => {
                    expect(responseBody[0].message).contains('has already been taken')
                })
                cy.deleteUser(userId).its('status').should('be.eq', 204)
            })
    })
})