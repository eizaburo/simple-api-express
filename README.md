# simple-api-express

node.js + ExpressによるシンプルなWebAPI実装サンプル。

# ブランチ情報

- main
  - CreateとReadのみ実装

# 利用方法

```bash
git clone https://github.com/eizaburo/simple-api-express.git
cd simple-api-express
npm install
node index.mjs
```

# 動作確認

## 正常系

Create（新規追加）

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"title":"hoge", "email":"hoge@hoge.com", "message":"hogehoge"}' \
http://localhost:3000/contacts
```

Read（読み取り：全データ）

```bash
curl -X GET http://localhost:3000/contacts
```

Read（読み取り：指定した１つ）

```bash
curl -X GET http://localhost:3000/contacts/1
```

## 異常系

問合せタイトル不正（長すぎ）

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"title":"12345678901", "email":"hoge@hoge.com", "message":"hogehoge"}' \
http://localhost:3000/contacts
```

レスポンス。

```bash
{"status":"error","message":"問合せタイトルの値が不正です。"}
```

Email不正（フォーマットが違う）

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"title":"hoge", "email":"hogehoge.com", "message":"hogehoge"}' \
http://localhost:3000/contacts
```

レスポンス。

```bash
{"status":"error","message":"Emailの値が不正です。"}
```

問合せ内容不正（短すぎ）

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"title":"hoge", "email":"hogehoge.com", "message":""}' \
http://localhost:3000/contacts
```

レスポンス。

```bash
{"status":"error","message":"Emailの値が不正です。"}
```
