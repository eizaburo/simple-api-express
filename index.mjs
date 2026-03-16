import express from "express";
// expressをappという名前で使えるようにする
const app = express();

// jsonを処理できるようにする
app.use(express.json());

// CORSに対応（とりあえず何でも受入）
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});

// dbを利用するための設定
import { Pool } from "pg";
const pool = new Pool({
    host: "localhost",
    database: "testdb",
    user: "dbuser",
    password: "postgres",
    port: 5432
});

//バリデーション用の正規表現定義
const regex_title = /^.{1,10}$/;
const regex_email = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const regex_message = /^.{1,10}$/;

// /にアクセスがきたらHello Node.js + Expressと返す。
app.get("/", (req, res) => {
    res.send("Hello Node.js + Express");
});

// /contacts, POST , JSONを受け取る
app.post("/contacts", async (req, res) => {
    // 値を取得（分割代入）。req.body自体が無い場合は{}を設定し、エラー防止。
    const { title, email, message } = req.body ?? {};

    //バリデーション
    if (!regex_title.test(title)) return res.status(400).json({ "status": "error", "message": "問合せタイトルの値が不正です。" });
    if (!regex_email.test(email)) return res.status(400).json({ "status": "error", "message": "Emailの値が不正です。" });
    if (!regex_message.test(message)) return res.status(400).json({ "status": "error", "message": "問合せ内容の値が不正です。" });

    // dbへのINSERT処理
    try {

        const result = await pool.query({
            text: "INSERT INTO contacts(title, email, message) VALUES($1,$2,$3) returning *",
            values: [title, email, message]
        });
        // jsonでレスポンス（ちょと実用的に整形）
        return res.json({
            "status": "success",
            "message": "受け付けました。",
            "data": result.rows[0]
        });
    } catch (error) {
        return res.json({
            "status": "error",
            "message": "DB処理でエラーが発生しました。",
            "data": error
        });
    }
});

// /contacts, GET, DBの内容の全てを返す
app.get("/contacts", async (req, res) => {
    try {

        const result = await pool.query("SELECT * FROM contacts");
        return res.json({
            "status": "success",
            "message": "受け付けました。",
            "data": result.rows
        });

    } catch (error) {
        return res.json({
            "status": "error",
            "message": "DB処理でエラーが発生しました。",
            "data": error
        });
    }
});



// /contacts/:id, GET, 指定したIDのレコードを返す
app.get("/contacts/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query({
            text: "SELECT * FROM contacts WHERE id = $1",
            values: [id]
        });
        if (result.rows.length === 0) {
            return res.status(404).json({
                "status": "error",
                "message": "指定されたIDのデータが見つかりません。",
                "data": null
            });
        }
        return res.json({
            "status": "success",
            "message": "受け付けました。",
            "data": result.rows[0]
        });
    } catch (error) {
        return res.json({
            "status": "error",
            "message": "DB処理でエラーが発生しました。",
            "data": error
        });
    }
});

// ポート3000を使ってリッスン
app.listen(3000, () => {
    console.log("Server start.");
});