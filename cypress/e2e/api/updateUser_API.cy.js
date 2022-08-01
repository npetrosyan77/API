import {requestBody} from "../../support/commands"
import {checkUpdatedData} from "../../pages/users"


var creds = requestBody();
var creds1 = requestBody();

describe('Update user via API', () => {
    it('Updating user via PUT method', () => {
        cy.createUser(creds).its('body').then((response) => {
            cy.log(response.name)
            global.userId = response.id
            cy.updateUser(userId, creds1, creds)
            checkUpdatedData.userData().isCorrect(creds1, creds)
        })
    })
})

