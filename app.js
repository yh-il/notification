var Nightmare = require('nightmare');

const nightmare = Nightmare({ show: true });
nightmare
    .goto('https://www.yahoo.co.jp/')
    .type('input[title="Search"]', 'github nightmare')
    .click('.searchsubmit')

    .end()
    .then(console.log)
    .catch((error) => {
        console.error('Search failed:', error);
    });
