
/**
 * setting Nightmare
 */
// let Nightmare = require('nightmare');
// const nightmare = Nightmare({ show: true });

// const user = '*****';
// const pass = '*****';


// nightmare
// .goto('https://www.google.co.jp/')
// .type('#input__user', user);
// .type('#input__pass', pass);
// .click('#login_submit')
// .type('#lst-ib', 'github nightmare')
// .click('input[name="btnK"]')
// .evaluate(function() {
//     return document.querySelector("h3[class='r'] a").href;
// })
// .then(function(result) {
//     console.log(result);
// })

// .end()
// .then(console.log)
// .catch((error) => {
//     console.error('error message:', error);
// });

//=====================================================

/**
 * LINE
 */
const Line = require('./line');
const MyLine = new Line();
const TOKEN = '****************:';

// LINE Notify トークンセット
MyLine.setToken(TOKEN);
// メッセージ送信
MyLine.notify('送信したいメッセージ');