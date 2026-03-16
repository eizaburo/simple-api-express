const express = require("express");
const app = express();

app.use(express.json());

const { Pool } = require("pg");
// db接続情報設定
const pool = new Pool({
    host: "localhost",
    database: "testdb",
    user: "dbuser",
    password: "postgres",
    port: 5432
});

// /にgetでアクセスされた場合の処理
app.get("/", (req, res) => {
    res.send("Hello Node.js + Expres");
});

// JSONでtitle, email, messageを受け取る
app.post("/contact", async (req, res) => {
    // 値の取得
    const { title, email, message } = req.body;

    // db連携（INSERT）
    const result = await 

    // 受け取った値をdataに入れて返す
    res.json({ "status": "success", "data": { title, email, message } });
});

// listen開始
app.listen(3000, () => {
    console.log("Server start.");
});