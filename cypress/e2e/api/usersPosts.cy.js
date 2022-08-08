import {requestBody, postBodyCont} from '../../support/commands'
import {postBody} from '../../pages/posts'


var creds1 = requestBody(),
    post1 = postBodyCont();


describe('Create user\'s post via API', () => {
    it('Check that user\'s post successfully added', () => {
        cy.createUser(creds1)
        cy.get('@userCreate').its('body').then((userInfo) => {
            let userId = userInfo.id
            cy.createAPost(userId, post1).its('body').then((createdPost) => {
                let postId = createdPost.id
                cy.getPosts(userId).its('body').then((postList) => {
                    postBody.postBody().isCorrect(post1.title, post1.body, postId, userId)
                })
            })

        })
    })
})