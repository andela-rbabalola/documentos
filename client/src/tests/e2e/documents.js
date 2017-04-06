const faker = require('faker');
const config = require('../../../../nightwatch.conf');

module.exports = {
  'Documents': function (browser) {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .waitForElementVisible('input[type=email]')
      .setValue('input[type=email]', 'rotimi@gmail.com')
      .setValue('input[type=password]', 'rotimi123')
      .click('.btn')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/dashboard')
      .waitForElementVisible('.btn-floating', 1000)
      .click('#create-document')
      .moveToElement('.btn-floating', 0, 0)
      .mouseButtonClick(0)
      .waitForElementVisible('div[id="createModal"]', 10000)
      .pause(1000)
      .waitForElementVisible('input[name=title]', 10000)
      .waitForElementVisible('div.fr-element', 10000)
      .setValue('input[name=title]', faker.company.catchPhrase())
      .setValue('div.fr-element', faker.lorem.paragraph())
      .click('.btn')
      .waitForElementVisible('.toast-success')
      .assert.containsText('.toast-success',
      'Document created')
      .end();
  }
};
