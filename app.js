/**
 * LINE
 */
const Line = require('./Line');
const MyLine = new Line();
const TOKEN = '**';

// LINE Notify トークンセット
MyLine.setToken(TOKEN);
// メッセージ送信
// MyLine.notify('インターバルテスト');

// =====================================================

/**
 * setting Nightmare
 */
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: false });

const user = '**';
const pass = '**';

const fs = require('fs');
// const DATA_URL = './data.json';
// フルパスじゃないと定期実行できない
const DATA_URL = '**s';
let data = require(DATA_URL);
let LESSON_DAY = Number(data["day"]) + 1;
let LESSON_NUM = data["lesson"];

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

// =====================================================
// querySelectorのテスト
// .evaluate(function() {
//     return document.querySelectorAll('#day_')[1].querySelector('#title_week').textContent.trim();
// })
// .then(function(result) {
//     console.log(result);
// })
// =====================================================


// レッスン選択
// .click('#schedule div:nth-of-type(' + LESSON_DAY + ') a[href="javascript:void(0)"]:nth-of-type(' + LESSON_NUM + ') div.unit')
.click('#schedule div:nth-of-type(' + LESSON_DAY + ') a[href="javascript:void(0)"]:nth-of-type(' + LESSON_NUM + ') div:nth-of-type(' + 1 + ')')

// set -> 非アクティブ
// thickbox -> アクティブ
// myset ->自分の予約しているトランポリン
// thickboxの数を数える
.evaluate(function() {
    let allTrampoline = document.querySelectorAll('div.seat_map div.number').length;
    let inactiveTrampoline = document.querySelectorAll('div.seat_map div.number a[href="javascript:void(0)"].set').length;
    let myTrampoline = document.querySelectorAll('div.seat_map div.number a[href="javascript:void(0)"].myset').length;
    let activeTrampoline = allTrampoline - ( inactiveTrampoline + myTrampoline );
    return activeTrampoline;
})
.end()
.then(function(result) {
    let before = data["before"];
    let now = result;

    if (before < now) {
        console.log('空きが出た');
        // 通知を飛ばす
        MyLine.notify('空きが出た');
    } else if (before === now) {
        console.log('変わらない');
        // MyLine.notify('変わらない');
    } else if (before > now) {
        console.log('空きが減った');
        // MyLine.notify('空きが減った');
    }
    // 空きトランポリン数を更新
    data["before"] = now;
    fs.writeFile(DATA_URL, JSON.stringify(data, null, '    '));
})


//=====================================================

/**
 * DB接続の場合
 */
// const Db = require('./db');
// const MyDb = new Db();
// MyDb.dbConect();

//=====================================================
