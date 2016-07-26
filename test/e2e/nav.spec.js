const url = 'http://localhost:3000/nav';
const addUrl = 'http://localhost:3000/add-text';

module.exports = {
  tags: ['NavPage'],

  before (client) {
    client.url(url).waitForElementVisible('body', 20000);
  },

  'Assert add link' (client) {
    client.waitForElementVisible('[href="/add-text"]', 20000);
    client.click('[href="/add-text"]');
    client.assert.urlEquals(addUrl);
    client.url(url).waitForElementVisible('body', 20000);
  },

  'Assert links' (client) {
    client.elements('css selector', '[href^="./texts/"]', res => {
      const links = res.value;
      client.expect(links).to.have.length.above(1);
    });
  },

  after (client) {
    client.end();
  }

};
