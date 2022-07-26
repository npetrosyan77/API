import faker from "faker"


export const requestBody = () =>{
    return{
        name: faker.random.word(1),
        gender: 'female',
        email: faker.internet.exampleEmail(),
        status: 'active'
    }
}

Cypress.Commands.add('createUser', ()=> {
    cy.request({
        method: 'POST',
        url: 'https://gorest.co.in/public/v2/users',
        headers: {
            Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5',
            'Content-Type': 'application/json'
        },
        body: {
            name: faker.random.word(2),
            gender: 'female',
            email: faker.internet.exampleEmail(),
            status: 'active'
        },
    }).then((user)=>{
        expect(user.status).to.eq(201)
        global.userId = user.body.id
        cy.log(userId)

    })

})