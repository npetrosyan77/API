import {requestBody} from "../../support/commands"

var creds = requestBody();
var creds1 = requestBody();

describe('Delete user via API ', () => {
    it('Deleting user via API (REST cURL)', () => {
        cy.getUsersList_();
        cy.get('@usersList').then((foundUsers) => {
            var foundUsersCount = foundUsers.length;
            cy.log(foundUsersCount)
            cy.createUser(creds)
            cy.get('@userCreate').its('body').then((newUser) => {
                var userId = newUser.id
                var newUserName = newUser.name;
                cy.log(newUserName)
                cy.getUsersList_();
                cy.get('@usersList').then((newListofUsers) => {
                    expect(newListofUsers[0].name).to.eq(creds.name)
                    expect(newListofUsers.length).to.eq(foundUsersCount + 1)
                })
                cy.deleteUser(userId)
                cy.getUsersList_()
                cy.get('@usersList').then((listofUsers) => {
                    expect(listofUsers[0].name).to.not.eq(creds.name)
                    expect(listofUsers.length).to.eq(foundUsersCount)
                })
            })
        })
    })


    it('Deleting user via API (GraphQL cURL)', () => {
        cy.getUsersList()
        cy.get('@usersCount').its('totalCount')
            .then((usersCount) => {
                cy.log(usersCount)
                cy.createUser(creds1).its('body')
                    .then((newUser) => {
                        var userId = newUser.id
                        cy.log(newUser.name)
                        cy.getUsersList()
                        cy.get('@usersCount').its('nodes').then((usersList) => {
                            expect(usersList[0]).to.have.property('name', creds1.name)
                        })
                        cy.get('@usersCount').its('totalCount').should('be.eq', usersCount + 1)
                        cy.deleteUser(userId)
                        cy.getUsersList()
                        cy.get('@usersCount').its('nodes').then((usersList) => {
                            expect(usersList[0].name).not.eq(creds1.name)
                        })
                        cy.get('@usersCount').its('totalCount').should('be.eq', usersCount)
                    })
            })
    })
})














