describe('Issue delete', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
        //System will already open issue creating modal in beforeEach block  
        cy.visit(url + '/board?modal-issue-create=true');
        });
      });
    
    it('delete an issue', () => {
      // Press on the issue
      cy.get('[data-testid="list-issue"]').contains('This is an issue of type: Task').click({force: true})
      // CLick on trash icon
      cy.get('[data-testid="icon:trash"]').click()
      cy.contains('Delete issue').click({force: true})

    
      // Assert that the deletion confirmation dialogue is not visible
      cy.get('[data-testid="modal:confirm"]').should('not.exist');

      // Assert that the issue is deleted and no longer displayed on the Jira board
      cy.contains('This is an issue of type: Task.').should('not.exist');
  });

  

  it('Cancel the deleting process', () => {
    cy.get('[data-testid="list-issue"]').contains('This is an issue of type: Task').click({force: true})
      // CLick on trash icon
      cy.get('[data-testid="icon:trash"]').click()
      cy.contains('Cancel').click()

      // Assert that the deletion confirmation dialogue is not visible
      cy.get('[data-testid="modal:confirm"]').should('not.exist');

      // Assert that the issue is not deleted and is still displayed on the Jira board
      cy.contains('This is an issue of type: Task.').should('exist');

});
});
