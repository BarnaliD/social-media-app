describe('Full UI Flow - Social Media App', () => {
  const uniqueUser = `user${Date.now()}`;
  const password = 'test123';

  it('Registers a new user via UI', () => {
    cy.visit('/');
    cy.get('#regUsername').type(uniqueUser);
    cy.get('#regPassword').type(password);
    cy.get('#registerForm').submit();

    cy.on('window:alert', (msg) => {
      expect(msg).to.include('User registered'); 
    });
  });

  it('Logs in the user via UI', () => {
    cy.visit('/');
    cy.get('#loginUsername').type(uniqueUser);
    cy.get('#loginPassword').type(password);
    cy.get('#loginForm').submit();

    cy.on('window:alert', (msg) => {
      expect(msg).to.include('Logged in');
    });
  });

  it('Changes password via UI', () => {
    cy.visit('/');
    cy.get('#newPassword').type('newpass123');
    cy.get('#passwordForm').submit();

    cy.on('window:alert', (msg) => {
      expect(msg).to.include('Password changed');
    });
  });
});
