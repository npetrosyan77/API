export const postBody = class PostBodyCheck {
    static postBody() {
        return {
            isCorrect: (arg1, arg2, arg3, arg4)=>{
                cy.get('@postsList').then((postContent)=>{
                    expect(postContent.body[0]).to.have.property('title', arg1)
                    expect(postContent.body[0]).to.have.property('body', arg2)
                    expect(postContent.body[0]).to.have.property('id', arg3)
                    expect(postContent.body[0]).to.have.property('user_id', arg4)
                })
            }
        }
    }
}
