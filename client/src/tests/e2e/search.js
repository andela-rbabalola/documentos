const config = require('../../../../nightwatch.conf');

module.exports = {
  'Search': function (browser) {
    browser
      .url('http://localhost:5000')
      .waitForElementVisible('body')
      .waitForElementVisible('input[type=email]')
      .setValue('input[type=email]', 'rotimi@gmail.com')
      .setValue('input[type=password]', 'rotimi123')
      .click('.btn')
      .pause(1000)
      .assert.urlEquals('http://localhost:5000/dashboard')
      .assert.containsText('.search', ' Search')
      .waitForElementVisible('ul[id="nav-mobile"]')
      .waitForElementVisible('nav ul li[id="searchlink"]')
      .moveToElement('li[id="searchlink"]', 0, 0)
      .mouseButtonClick(0)
      .waitForElementVisible('div[id=search-modal]', 10000)
      .pause(1000)
      .setValue('input[id=search-query]', 'pictures')
      .click('#search-button')
      .pause(1000)
      .assert.elementPresent('.ReactTable')
      .end();
  }
};
