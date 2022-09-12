import faker from "faker"
import moment from'moment';

let date = new Date();

export const requestBody = () => {
    return {
        name: faker.random.word(2),
        gender: 'female',
        email: faker.internet.exampleEmail(),
        status: 'active'
    }
}

export const postBody = () => {
    return {
        title: faker.random.word(1),
        body: faker.random.words(10),
    }
}

export const commentBody = () => {
    return {
        name: faker.name.firstName() + ' ' + faker.name.lastName(),
        email: faker.internet.exampleEmail(),
        body: faker.random.words(10)
    }
}


export const todoBody = () => {
    return{
        title: faker.random.words(5),
        // due_on: moment().format('YYYY-DD-MM') + 'T00:00:00.000+05:30',
        due_on: moment().format(),
        // due_on: Date.now() + 'T00:00:00.000+05:30',
        status: 'pending'
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
        body: {"query": "query{users {pageInfo {endCursor startCursor hasNextPage hasPreviousPage} " +
                "totalCount nodes {id name email gender status}}}"},
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


Cypress.Commands.add('updateUser', (arg1, arg2, arg3) => {
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


Cypress.Commands.add('createPost', (user_id, post) => {
    cy.request({
            method: 'POST',
            url: `https://gorest.co.in/public/v2/users/${user_id}/posts`,
            body: {
                title: post.title,
                body: post.body
            },
            headers: {
                Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
            }
        }
    )
})

Cypress.Commands.add('getPosts', (user_id) => {
    cy.request({
        method: 'GET',
        url: `https://gorest.co.in/public/v2/users/${user_id}/posts`,
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
        }
    }).as('postsList')
})


Cypress.Commands.add('addComment', (post_id, comment) => {
    cy.request({
        method: 'POST',
        url: `https://gorest.co.in/public/v2/posts/${post_id}/comments`,
        body: {
            post_id: post_id,
            name: comment.name,
            email: comment.email,
            body: comment.body
        },
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
        },
    }).as('newComment')
})


Cypress.Commands.add('getCommentsList', (post_id) => {
    cy.request({
        method: 'GET',
        url: `https://gorest.co.in/public/v2/posts/${post_id}/comments`,
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
        }
    }).its('body').as('commentsList')
})


Cypress.Commands.add('createTodo', (user_id, todo)=>{
    cy.request({
        method: 'POST',
        url: `https://gorest.co.in/public/v2/users/${user_id}/todos`,
        body:{
            user_id: user_id,
            title: todo.title,
            due_on: todo.due_on,
            status: todo.status
        },
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
        }
    }).its('body').as('newTodo')
})


Cypress.Commands.add('getTodoList', (user_id)=>{
    cy.request({
        method: 'GE',
        url: `https://gorest.co.in/public/v2/users/${user_id}/todos`,
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
        }
    }).its('body').as('todosList')
})