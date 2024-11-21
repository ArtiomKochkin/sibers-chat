describe("Home page tests", () => {

  beforeEach(() => {
    cy.visit('/');
  });

  it('renders the entry form correctly', () => {
    cy.get('input[name="name"]').should('have.attr', 'placeholder', 'Name');
    cy.get('input[name="room"]').should('have.attr', "placeholder", 'Chat');
    cy.get('button').should('have.text', 'Join');
  });

  it("redirects to chat page after entering the fields and click", () => {
    cy.get('input[name="name"]')
      .type('Messi')
      .should('have.value', 'Messi');
    
    cy.get('input[name="room"]')
      .type('football')
      .should('have.value', 'football');
    
    cy.contains('Join').click();
    cy.url().should('include', '/chat?name=Messi&room=football');
  }); 
});