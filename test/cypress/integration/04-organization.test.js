describe('New organization profile', () => {
  /**
   * Contributions section is already tested in `05-user.test.js`
   * About section is already tested in `04-collective.test.js`
   */
  beforeEach(() => {
    cy.createCollective({ type: 'ORGANIZATION' }).then(collective => {
      const collectiveSlug = collective.slug;
      cy.visit(`/${collectiveSlug}/`);
    });
  });

  it('Has a team section', () => {
    cy.getByDataCy('section-our-team').contains('Our team');
    cy.getByDataCy('section-our-team').contains('Test User Admin');
  });
});
