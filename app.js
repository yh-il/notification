var Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });
nightmare
    .goto('https://www.google.co.jp/')
    .type('#lst-ib', 'github nightmare')
    .click('input[name="btnK"]')
    // .end()
    // .then(console.log)
    .catch((error) => {
        console.error('Search failed:', error);
    });
