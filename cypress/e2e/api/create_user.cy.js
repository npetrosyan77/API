import faker from "faker"
let email = faker.internet.exampleEmail()
const map = new Map();
describe('Investigating APIs', ()=>{
    //
    // it('Create a user via API', ()=>{
    //     cy.request('GET', 'https://gorest.co.in/public/v2/users')
    //         .then((user)=>{
    //             expect(user.status).to.equal(200)
    //         })
    // })
    //
    // it('Create a new user via API', ()=>{
    //     cy.request({
    //         method: 'POST',
    //         url: 'https://gorest.co.in/public/v2/users',
    //         // form: true,
    //         headers: {
    //             Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5',
    //             'Content-Type': 'application/json'
    //         },
    //         body: {
    //             name: "Johnson",
    //             gender: "male",
    //             email: email,
    //             status: "active"
    //         },
    //     }).then((user)=>{
    //         expect(user.status).to.eq(201)
    //     })
    // })

    it('Checking user info', ()=>{
       cy.createUser()

        cy.request('GET', `https://gorest.co.in/public/v2/users/${userId}`).then((newUser)=>{
            expect(newUser.body).to.have.property('name', name)
        })
    })

})



