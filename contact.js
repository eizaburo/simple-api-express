const express = require("express");
const app = express();

//DB接続設定。WebではPoolを使うのが一般的
const { Pool } = require("pg");
const pool = new Pool({
    host: "localhost",
    database: "testdb",
    user: "dbuser",
    password: "postgres",
    port: 5432
});

//CORS対応（とりあえず手書きで全許可）
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

//x-www-form-urlencoded, JSONでPOSTされた値を受け取るために必要
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//とりあえずテスト表示
app.get("/", (req, res) => {
    res.send("Hello Node.js API.");
});

//値をPOST（x-form-urlencodedで）受け取ってInsertし、レスポンスをテキストで返す
app.post("/text/contacts", async (req, res) => {
    //POSTされた値を取得
    const { title, email, message } = req.body;

    try {

        //取得した値をDBに挿入
        const result = await pool.query({
            text: "insert into contacts(title,email,message) values($1,$2,$3) returning *",
            values: [title, email, message]
        });

        //レスポンスを返す
        res.send("受け付けました（from node.js - text）");

    } catch (error) {
        res.status(500).send(`エラー：${error.toString()}`);
    }

});

//値をPOST（jsonで）受け取ってInsertし、レスポンスをJSONで返す
app.post("/json/contacts", async (req, res) => {
    //POSTされた値を取得
    const { title, email, message } = req.body;
    try {
        //取得した値をDBに挿入
        const result = await pool.query({
            text: "insert into contacts(title,email,message) values($1,$2,$3) returning *",
            values: [title, email, message]
        });

        // 挿入されたレコードをJSONで返す
        res.json({
            message: "受け付けました（from node.js - json）",
            contact: result.rows[0]
        });
    } catch (error) {
        res.status(500).json({ error: error.toString() });
    }

});


//サーバスタート（リッスン開始）
app.listen(3333, () => {
    console.log("API Server start.")
});