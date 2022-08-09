export const newPost = class PostBodyCheck {
    static postBody() {
        return {
            isCorrect: (post, post_id, user_id) => {
                cy.get('@postsList').then((postContent) => {
                    expect(postContent.body[0]).to.have.property('title', post.title)
                    expect(postContent.body[0]).to.have.property('body', post.body)
                    expect(postContent.body[0]).to.have.property('id', post_id)
                    expect(postContent.body[0]).to.have.property('user_id', user_id)
                })
            }
        }
    }
}


export const newComment = class CommentBody{
    static commentBody(){
        return{
            isCorrect: (post_id, comm)=>{
                cy.get('@newComment').its('body').then((commentContent)=>{
                    expect(commentContent).to.have.property('post_id', post_id)
                    expect(commentContent).to.have.property('name', comm.name)
                    expect(commentContent).to.have.property('email', comm.email)
                    expect(commentContent).to.have.property('body', comm.body)
                })
            }
        }
    }
}


export const commentInList = class CommentContent {
    static commentBody() {
        return {
            isCorrect: (post_id, comm) => {
                cy.get('@commentsList').then((postComment) => {
                    expect(postComment).to.have.length(1)
                    expect(postComment[0]).to.have.property('post_id', post_id)
                    expect(postComment[0]).to.have.property('name', comm.name)
                    expect(postComment[0]).to.have.property('email', comm.email)
                    expect(postComment[0]).to.have.property('body', comm.body)
                })
            }
        }
    }
}


export const newTodo = class TodoBody{
    static todoBody(){
        return{
            isCorrect: (user_id, todo)=>{
                cy.get('@newTodo').then((todoBody)=>{
                    expect(todoBody).to.have.property('user_id', user_id)
                    expect(todoBody).to.have.property('title', todo.title)
                    expect(todoBody).to.have.property('due_on', todo.due_on)
                    expect(todoBody).to.have.property('status', todo.status)
                })
            }
        }
    }
}


export const todoInList = class TodoContent {
    static todoBody() {
        return {
            isCorrect: (user_id, todo) => {
                cy.get('@todosList').then((todos) => {
                    expect(todos).to.have.length(1)
                    expect(todos[0]).to.have.property('user_id', user_id)
                    expect(todos[0]).to.have.property('title', todo.title)
                    expect(todos[0]).to.have.property('due_on', todo.due_on)
                    expect(todos[0]).to.have.property('status', todo.status)
                })
            }
        }
    }
}