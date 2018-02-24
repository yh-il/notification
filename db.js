var MongoClient = require("mongodb").MongoClient;
 
// 接続文字列
var url = "mongodb://localhost:27017";
const dbName = 'sample';
 
MongoClient.connect(url, function(err, client) {
    console.log("Connected successfully to server");
  
    const db = client.db(dbName);

    let obj = {
        "freeTrampolines": 2
    };

    // findDocuments(db, function () {
    //     client.close();
    // });

    // removeDocument(db, function () {
    //     client.close();
    // });

    // insertDocuments(db, obj, function () {
    //     client.close();
    // });
});


// =====================================================


/**
 * 挿入
 * @param {*} db 
 * @param {*} callback 
 */
const insertDocuments = function (db, obj, callback) {
    const collection = db.collection('sample');
    collection.insertMany([obj], function (err, result) {
        console.log("Inserted documents into the collection");
        callback(result);
    });
}


/**
 * 取得
 * @param {*} db 
 * @param {*} callback 
 */
const findDocuments = function(db, callback) {
    const collection = db.collection('sample');
    collection.find({}).toArray(function(err, docs) {
        console.log("Found the following records");
        console.log(docs[0]["freeTrampolines"])
        callback(docs);
    });
}


/**
 * 更新
 * @param {*} db 
 * @param {*} callback 
 */
const updateDocument = function(db, callback) {
    const collection = db.collection('sample');
    collection.updateOne({
        a: 2
    }, {
        $set: {
            b: 1
        }
    }, function (err, result) {
        console.log("Updated the document with the field a equal to 2");
        callback(result);
    });
}


/**
 * 削除
 * @param {*} db 
 * @param {*} callback 
 */
const removeDocument = function (db, callback) {
    const collection = db.collection('sample');
    collection.deleteOne({
        name: 'okome'
    }, function (err, result) {
        console.log("Removed the document with the field a equal to 3");
        callback(result);
    });
}