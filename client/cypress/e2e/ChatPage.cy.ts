describe("Chat page tests", () => {

  beforeEach(() => {
    cy.visit('/chat?name=Messi&room=football');
  });

  it("renders chat page correctly", () => {
    cy.get('header').contains('Messi').should('be.visible');
    cy.get('aside').contains('Messi').should('be.visible');
    cy.get('aside').contains('football').should('be.visible');

    cy.get('header').contains('Left the room').should('be.visible');
    cy.get('input[type="search"]').should('be.empty');
    cy.contains('You have joined the chat').should('be.visible');

    cy.get('button[type="submit"]').should('be.visible');
    cy.get('input[name="message"]').should('be.focused');

    cy.get('button[data-testid="toggle-sidebar"]').click();
    cy.get('aside').should('have.css', 'width', '0px');
  }); 

  it("sends and shows message", () => {
    cy.get('input[name="message"]')
      .type('Hello, friends!')
      .should('have.value', 'Hello, friends!');

    cy.contains('Send').click();
    cy.contains('Hello, friends!').should('be.visible');
    cy.get('input[name="message"]').should('have.value', '');
  }); 

  it("updates the search field and shows results correctly ", () => {
    cy.get('input[type="search"]')
      .type('mes')
      .should('have.value', 'mes');
    
    cy.get('aside').contains('Messi').should('be.visible');
    
    cy.get('input[type="search"]')
      .clear()
      .should('have.value', '');

    cy.get('aside').contains('Messi').should('be.visible');
  }); 

  it("renders page correctly after reloading", () => {
    cy.reload();

    cy.get('header').contains('Messi').should('be.visible');
    cy.get('aside').contains('Messi').should('be.visible');
    cy.get('aside').contains('football').should('be.visible');

    cy.contains('You have joined the chat again').should('be.visible');
  }); 

  it("renders multiple users in the chat", () => {
    cy.visit('/chat?name=Ronaldo&room=football');

    cy.get('aside').contains('Messi').should('be.visible');
    cy.get('aside').contains('Ronaldo').should('be.visible');

    cy.get('input[name="message"]')
      .type('Hala Madrid!')
      .should('have.value', 'Hala Madrid!');

    cy.contains('Send').click();
    cy.contains('Hala Madrid!').should('be.visible');    
  }); 

  it("leave the room and renders home page correctly", () => {
    cy.contains('Left the room').click();

    cy.url().should('includes', '/');
    cy.get('button').should('have.text', 'Join');
  });

  it("updates the chat after removing users", () => {    
    cy.visit('/chat?name=Ronaldo&room=football');
    cy.visit('/chat?name=Neymar&room=football');

    cy.get('aside').contains('Users (3)').should('exist');

    cy.visit('/chat?name=Messi&room=football');
    cy.get('li:last-child div:last-child').click({ force: true });

    cy.contains('Neymar has been removed by admin').should('exist');
    cy.get('aside').contains('Users (2)').should('exist');
    cy.get('aside').contains('Neymar').should('not.exist');
  }); 
});