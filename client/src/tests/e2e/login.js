const config = require('../../../../nightwatch.conf');

module.exports = { // addapted from: https://git.io/vodU0
  '@disabled': true,
  'Documentos Title': function (browser) {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .assert.title('Documentos')
      .end();
  }
};


