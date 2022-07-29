import {requestBody} from "../../support/commands"

global.creds = requestBody();

describe('Create, get and delete a user via API', () => {

    it('Create, get and delete a user using REST cURL*', () => {
        cy.createUser(creds)
        cy.get('@userCreate').its('body')
            .then((response) => {
                var userId = response.id
                cy.request({
                    method: 'GET',
                    url: `https://gorest.co.in/public/v2/users/${userId}`,
                    headers: {
                        Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
                    }
                }).then((foundUser) => {
                    expect(foundUser.status).to.eq(200)
                    expect(foundUser.body).to.have.property('name', creds.name)
                    expect(foundUser.body).to.have.property('gender', creds.gender)
                    expect(foundUser.body).to.have.property('email', creds.email)
                    expect(foundUser.body).to.have.property('status', creds.status)
                    expect(foundUser.body.status).to.eq(creds.status)
                })
                cy.deleteUser(userId)
                cy.get('@deleteUser').its('status').should('be.eq', 204)
                cy.getUser(userId).its('body').then((notFound)=>{
                    expect(notFound).to.have.property("message", "Resource not found")
                cy.getUser(userId).its('status').should('be.eq', 404)
                    //Isn't it possible to check both property and status of call at once?
                })
            })
    })
})