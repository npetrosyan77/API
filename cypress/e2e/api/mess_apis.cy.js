import {requestBody} from "../../support/commands";

global.creds1 = requestBody();

describe('Delete resquest', () => {
    it('DELETE user', () => {
        cy.createUser(creds1)
        cy.get('@userCreate').its('body')
            .then((response) => {
                let userID = response.id
                cy.log(userID)
                cy.request({
                    method: 'DELETE',
                    body: {"query": "mutation{deleteUser(input: {id: 7}){user {id name email gender status}}}"},
                    url: `https://gorest.co.in/public/v2/users/${userID}`,
                    headers: {
                        Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5',
                        'Content-type': 'application/json'
                    },
                })
                    .then((deletedUser) => {
                        expect(deletedUser.status).to.eq(204)
                    })
            })
    })


    it('GET the user by GraphQL cURL', () => {
        cy.createUser(creds1)
        cy.get('@userCreate').its('body')
            .then((response) => {
                global.userID = response.id
                cy.log(userID)
                cy.request({
                    method: 'POST',
                    url: 'https://gorest.co.in/public/v2/graphql',
                    body: {"query": "query{user(id: 2) { id name email gender status }}"},
                    headers: {
                        Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5',
                        'Content-Type': 'application/json'
                    }
                }).then((foundUser) => {
                    expect(foundUser.body).to.have.property('data')
                })
            })
    })


    it('Get users\' list with REST cURL', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v2/users',
            headers: {
                Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
            }
        }).then((usersList) => {
            expect(usersList.status).to.eq(200)
        })
    })

})