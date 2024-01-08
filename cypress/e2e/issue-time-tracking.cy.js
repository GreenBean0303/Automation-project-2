describe('Should add, edit and delete time estimation and tracking', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
            cy.visit(url + '/board');
            cy.contains('This is an issue of type: Task.').click();
        });
    });

    const getIssueDetailsModal = () => cy.get('[data-testid="modal:issue-details"]');
    const estimatedTime = '10'
    const editedEstimatedTime = '20'
    const stopwatch = '[data-testid="icon:stopwatch"]'
    const getTimeTrackingModal = () => cy.get('[data-testid="modal:tracking"]')
    const timeSpent = '2'
    const timeRemaining = '5'


    it('Should add, edit and delete time estimation', () => {
        
        getIssueDetailsModal().within(() => {
           //Should add time estimation
           cy.get('[placeholder="Number"]').should("be.visible").clear().type(estimatedTime)
           cy.get('div').contains(estimatedTime).should('be.visible')
           //Should edit time estimation
           cy.get('[placeholder="Number"]').should("be.visible").clear().type(editedEstimatedTime)
           cy.get('div').contains(editedEstimatedTime).should('be.visible')
           //Should delete time estimation
           cy.get('[placeholder="Number"]').should("be.visible").clear()
           cy.get('div').contains(editedEstimatedTime).should('not.exist')
        });
    });

    it('Should add and delete time tracking', () => {
        //Should add estimation again
        getIssueDetailsModal().within(() => {
            cy.get('[placeholder="Number"]').should("be.visible").clear().type(estimatedTime)
            cy.get('div').contains(estimatedTime).should('be.visible')
        });
        // Should add spent time and remaining time
        cy.get(stopwatch).should('be.visible').click()
        getTimeTrackingModal ().within(() => {
            cy.contains('Time spent (hours)')
            cy.get('[placeholder="Number"][value="4"]').clear().type(timeSpent)

            cy.contains('Time remaining (hours)')
            cy.get('[placeholder="Number"][value=""]').type(timeRemaining)

            cy.contains('button', 'Done')
            .click()
        });
        // Should check if everything is visible
        cy.contains('div', '2h logged').should('be.visible')
        cy.contains('div', '5h remaining').should('be.visible')

        //Should delete spent and remaining time
        cy.get(stopwatch).should('be.visible').click()
        getTimeTrackingModal ().within(() => {
            cy.contains('Time spent (hours)')
            cy.get('[placeholder="Number"][value="2"]').clear()

            cy.contains('Time remaining (hours)')
            cy.get('[placeholder="Number"][value="5"]').clear()

            cy.contains('button', 'Done')
            .click()
        });
        // Should check if everything is visible
        cy.contains('div', 'No time logged').should('be.visible')
        cy.contains('div', '5h remaining').should('not.exist')
        


    });
});
