const faker = require('faker');

const config = require('../../../../nightwatch.conf');

module.exports = {
  'Signup': function (browser) {
    browser
      .url('http://localhost:5000/signup')
      .waitForElementVisible('body')
      .waitForElementVisible('input[name=firstName]')
      .waitForElementVisible('input[name=lastName]')
      .waitForElementVisible('input[type=email]')
      .waitForElementVisible('input[type=password]')
      .setValue('input[name=firstName]', faker.name.firstName())
      .setValue('input[name=lastName]', faker.name.lastName())
      .setValue('input[type=email]', faker.internet.email())
      .setValue('input[type=password]', faker.internet.password())
      .click('.btn')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/dashboard')
      .assert.elementNotPresent('.manage')
      .assert.containsText('.logout', 'Logout')
      .assert.containsText('.search', ' Search')
      .end();
  }
};
