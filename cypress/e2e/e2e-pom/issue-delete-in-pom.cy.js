/**
 * This is an example file and approach for POM in Cypress
 */
import IssueModal from "../../pages/IssueModal";

describe('Issue delete', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.url().should('eq', `${Cypress.env('baseUrl')}project/board`).then((url) => {
    //open issue detail modal with title from line 16  
    cy.contains(issueTitle).click();
    });
  });

  //issue title, that we are testing with, saved into variable
  const issueTitle = 'This is an issue of type: Task.';

  it('Should delete issue successfully', () => {
    //add steps to delete issue
    cy.contains(issueTitle).click({force: true})
    IssueModal.clickDeleteButton()
    IssueModal.confirmDeletion({force: true})

    // Assert that the issue was deleted successfully
    IssueModal.ensureIssueIsNotVisibleOnBoard(issueTitle)

  });


  it('Should cancel deletion process successfully', () => {
    //add steps to start deletion proces but cancel it
    cy.contains(issueTitle).click({force: true})
    IssueModal.clickDeleteButton();
    IssueModal.cancelDeletion();
    IssueModal.closeDetailModal()

    //Assert that issue is not deleted
    IssueModal.ensureIssueIsVisibleOnBoard(issueTitle)
  });

});