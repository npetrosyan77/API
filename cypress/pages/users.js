export const checkBodyData = class responseBodyData {
    static property() {
        return {
            isCorrect: (arg1, arg2) => {
                cy.request({
                    url: `https://gorest.co.in/public/v2/users/${arg1}`,
                    headers: {
                        Authorization: 'Bearer 031748f0f31aefc94888aba83d3ed3d68f71073e13cc528f8ae55757250342e5'
                    }
                }).then((foundUser) => {
                    expect(foundUser.status).to.eq(200)
                    expect(foundUser.body).to.have.property('name', arg2.name)
                    expect(foundUser.body).to.have.property('gender', arg2.gender)
                    expect(foundUser.body).to.have.property('email', arg2.email)
                    expect(foundUser.body).to.have.property('status', arg2.status)
                    expect(foundUser.body.status).to.eq(arg2.status)
                })
            }
        }
    }
}


export const checkUpdatedData = class updatedData {
    static userData() {
        return {
            isCorrect: (arg1, arg2) => {
                cy.get('@updatedUser').then((updatedUserResponse) => {
                    expect(updatedUserResponse.body).to.have.property('name', arg1.name)
                    expect(updatedUserResponse.body).to.have.property('gender', arg2.gender)
                    expect(updatedUserResponse.body).to.have.property('email', arg2.email)
                    expect(updatedUserResponse.body).to.have.property('status', arg2.status)
                })

            }
        }
    }
}
