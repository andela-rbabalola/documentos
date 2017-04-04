const config = require('../../../../nightwatch.conf');

module.exports = { // addapted from: https://git.io/vodU0
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
      .setValue('input[type=email]', 'rotimi@gmail.com')
      .setValue('input[type=password]', 'rotimi123')
      .click('//a[text()="SIGN IN"]')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/')
      .end();
  }
};


