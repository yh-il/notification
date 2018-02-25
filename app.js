/**
 * LINE
 */
// const Line = require('./line');
// const MyLine = new Line();
// const TOKEN = '****';

// LINE Notify トークンセット
// MyLine.setToken(TOKEN);
// メッセージ送信
// MyLine.notify('送信したいメッセージ');

// =====================================================

/**
 * setting Nightmare
 */
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

const user = '***';
const pass = '***';

const fs = require('fs');
const DATA_URL = './data.json';
let data = require(DATA_URL);

nightmare

// ログインまでの処理
.goto('https://www.jumpone.jp/jumpone_reserve/mypage.php')
.type('input[name="login_id"]', user)
.type('input[name="login_pass"]', pass)
.click('input[src="img/top_login_off.gif"]')
.wait(1000)
.click('a[href="reserve.php"]')

/**
 * 店舗選択
 * 第二引数にoptionのvalue値を設定する
 */
.select('select[name="tenpo"]', data["tenpo"]) //銀座
.wait(1000)

// レッスン選択
.click(data["day"] + ' a[href="javascript:void(0)"]:nth-of-type(' + data["lesson"] + ') div.unit')

// set -> 非アクティブ
// thickbox -> アクティブ
// thickboxの数を数える
.evaluate(function() {
    let Nodelist = document.querySelectorAll('div.seat_map div.number a.thickbox');
    return Nodelist.length;
})
.then(function(result) {
    let before = data["before"];
    let now = result;
    if (before < now) {
        // 空きが出た
        console.log('空きが出た');
        // 通知を飛ばす
    } else if (before === now) {
        // 変わらない
        console.log('変わらない');
    } else if (before > now) {
        // 空きが減った
        console.log('空きが減った');
    }
    // 空きトランポリン数を更新
    data["before"] = now;
    fs.writeFile(DATA_URL, JSON.stringify(data, null, '    '));
})


/**
 * 判定の処理
 * day__b列の a > div .utit(アクティブ) か .unit_past(非アクティブ)
 * :nth-of-type(8) 上から8番目のレッスンを指定した場合
 */
// .evaluate(function() {
//     return document.querySelector('#day_ a[href="javascript:void(0)"]:nth-of-type(10) div.unit');
// })
// .then(function(result) {
//     if (result !== null) {
//         console.log("あいてる");
//         // トランポリン番号の取得
//         let tranpo = document.querySelector('');
//     } else {
//         console.log("あいてない");
//     }
// })

// .end()
// .then(console.log)
// .catch((error) => {
//     console.error('error message:', error);
// });

//=====================================================

/**
 * DB接続の場合
 */
// const Db = require('./db');
// const MyDb = new Db();
// MyDb.dbConect();

//=====================================================
