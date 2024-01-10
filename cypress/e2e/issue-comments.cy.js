describe('Issue comments creating, editing and deleting', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const comment = 'Yes, Agnes is testing this'
    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]')
    const clickAddComment = () => cy.contains('Add a comment...').click()
    var enterComment = () => cy.get('textarea[placeholder="Add a comment..."]').type(comment)
    const clickCommentTextField = () => cy.get('textarea[placeholder="Add a comment..."]').click()
    const clickAndVerifySaveButton = () => cy.contains('button', 'Save').click().should('not.exist');
    const verifyPlaceholder = () => cy.contains('Add a comment...').should('exist')
    const verifyComment = () => cy.get('[data-testid="issue-comment"]').should('contain', comment)
    const issueCommentTestId = () => cy.get('[data-testid="issue-comment"]')
    const previousComment = 'Yes, Agnes is testing this'
    const newComment = 'Yes, Agnes is testing this with functions and variables';
    const clickFirstIssueCommentEdit = () => issueCommentTestId().first().contains('Edit').should('exist').click()
    const deleteAndTypeNewComment = () => clickCommentTextField().should('contain', previousComment).clear().type(newComment)
    const verifyEditAndComment = () => cy.get('[data-testid="issue-comment"]').should('contain', 'Edit').and('contain', newComment)
    const deleteFirstIssueComment = () => issueCommentTestId().contains('Delete').click()
    const confirmDeleteComment = () =>  cy.get('[data-testid="modal:confirm"]').contains('button', 'Delete comment').click().should('not.exist')
    const verifyIssueCommentNotExists = () => getIssueDetailsModal().find(issueCommentTestId).should('not.exist')
    


    it('Should create a comment successfully, edit the comment successfully and then delete it after', () => {
       
        getIssueDetailsModal().within(() => {
            //Should add a comment
            clickAddComment()
            enterComment()
            // Should assert that comment has been added and is visible
            clickAndVerifySaveButton()
            verifyPlaceholder()
            verifyComment()
            //Should edit the added comment
            clickFirstIssueCommentEdit()
            deleteAndTypeNewComment()
            // Should assert that the updatedd comment is visible
            clickAndVerifySaveButton()
            verifyEditAndComment()
            //Should remove the comment
            deleteFirstIssueComment()
        });

       //Should handle the deletetion outside the within
        confirmDeleteComment();
        
        // Should verify the comment does not exist anymore
        verifyIssueCommentNotExists();
    });
});