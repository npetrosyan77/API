import faker from "faker"

export const requestBody = () => {
    return {
        name: faker.random.word(2),
        gender: 'female',
        email: faker.internet.exampleEmail(),
        status: 'active'
    }
}

Cypress.Commands.add('createUser', (creds) => {
    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v2/users',
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5',
            'Content-Type': 'application/json'
        },
        body: {
            name: creds.name,
            gender: creds.gender,
            email: creds.email,
            status: creds.status
        },
        failOnStatusCode: false
    }).as('userCreate')
})


Cypress.Commands.add('deleteUser', (arg) => {
    cy.request({
        method: 'DELETE',
        body: {"query": "mutation{deleteUser(input: {id: 7}){user {id name email gender status}}}"},
        url: `https://gorest.co.in/public/v2/users/${arg}`,
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5',
            'Content-type': 'application/json'
        },
        failOnStatusCode: false
    }).as('deleteUser')
})


Cypress.Commands.add('getUser', (arg) => {
    cy.request({
        method: 'GET',
        url: `https://gorest.co.in/public/v2/users/${arg}`,
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
        },
        failOnStatusCode: false
    }).as('gotUser')
})


Cypress.Commands.add('getUsersList', () => {
    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v2/graphql',
        body: {"query":"query{users {pageInfo {endCursor startCursor hasNextPage hasPreviousPage} totalCount nodes {id name email gender status}}}"},
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
        },
        failOnStatusCode: false
    }).its('body')
        .its('data').its('users')
        .as('usersCount')
})


Cypress.Commands.add('getUsersList_', () => {
    cy.request({
        method: 'GET',
        url: 'https://gorest.co.in/public/v2/users',
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
        },
        failOnStatusCode: false
    }).its('body').as('usersList')
})


Cypress.Commands.add('updateUser', (arg1, arg2, arg3)=>{
    cy.request({
        method: "PUT",
        url: `https://gorest.co.in/public/v2/users/${arg1}`,
        body: {
            name: arg2.name,
            gender: arg3.gender,
            email: arg3.email,
            status: arg3.status
        },
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
        }
    }).as('updatedUser')
})

