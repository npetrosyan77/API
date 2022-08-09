import {requestBody, postBody, commentBody, todoBody} from '../../support/commands'
import {newPost, commentInList, newComment, newTodo, todoInList} from '../../pages/posts'


var creds1 = requestBody(),
    creds2 = requestBody(),
    creds3 = requestBody(),
    post1 = postBody(),
    post2 = postBody(),
    comment = commentBody(),
    todo = todoBody();


describe("Create user's posts, comments and todos via API", () => {

    it("Check that user's post successfully added", () => {
        cy.createUser(creds1)
        cy.get('@userCreate').its('body').then((userInfo) => {
            let userId = userInfo.id
            cy.createPost(userId, post1).its('body').then((createdPost) => {
                let postId = createdPost.id
                cy.getPosts(userId).its('body').then((postList) => {
                    newPost.postBody().isCorrect(post1, postId, userId)
                })
            })

        })
    })


    it("Check that post comments are successfully added", () => {
        cy.createUser(creds2)
        cy.get('@userCreate').its('body').then((userInfo) => {
            let userId = userInfo.id
            cy.createPost(userId, post2)
                .its('body').then((createdPost) => {
                let postId = createdPost.id
                cy.log(postId)
                cy.addComment(postId, comment)
                newComment.commentBody().isCorrect(postId, comment)
                cy.getCommentsList(postId)
                commentInList.commentBody().isCorrect(postId, comment)
            })
        })
    })


    it("Check that todos are successfully added", () => {
        cy.createUser(creds3)
        cy.get('@userCreate').its('body').then((userInfo) => {
            let userId = userInfo.id
            cy.createTodo(userId, todo)
            newTodo.todoBody().isCorrect(userId, todo)
            cy.getTodoList(userId)
            todoInList.todoBody().isCorrect(userId, todo)
        })
    })
})