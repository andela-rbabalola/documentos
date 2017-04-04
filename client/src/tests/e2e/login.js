const config = require('../../../../nightwatch.conf');

module.exports = {
  'Documentos Title': function (browser) {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .assert.title('Documentos')
      .saveScreenshot(config.imgpath(browser) + 'Documentos.png')
      .end();
  },
  'Login Users': function (browser) {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .waitForElementVisible('input[type=email]')
      .setValue('input[type=email]', 'rotimi@gmail.com')
      .setValue('input[type=password]', 'rotimi123')
      .click('.btn')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/dashboard')
      .end();
  },
  'Fail for wrong password': function (browser) {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .waitForElementVisible('input[type=email]')
      .setValue('input[type=email]', 'rotimi@gmail.com')
      .setValue('input[type=password]', 'rotimi')
      .click('.btn')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/')
      .end();
  },
  'Admin Login': function (browser) {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('input[type=email]')
      .setValue('input[type=email]', 'rotimi@gmail.com')
      .setValue('input[type=password]', 'rotimi123')
      .click('.btn')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/dashboard')
      .assert.containsText('.manage', 'Manage')
      .assert.containsText('.logout', 'Logout')
      .assert.containsText('.search', ' Search')
      .end();
  },
  'User Login': function (browser) {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('input[type=email]')
      .setValue('input[type=email]', 'jane.andrews@gmail.com')
      .setValue('input[type=password]', 'jane123')
      .click('.btn')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/dashboard')
      .assert.elementNotPresent('.manage')
      .assert.containsText('.logout', 'Logout')
      .assert.containsText('.search', ' Search')
      .end();
  }
};

