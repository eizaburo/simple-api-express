# Simple API Express

学習用のシンプルなAPI実装（node.js + Express利用版）
[Simple Basic Web](https://github.com/eizaburo/simple-basic-web)のextension/api-expressブランチとの連携を想定した仕様になっています。

# 動作確認

## 単体

とりあえずの動作確認はcurlで以下のように可能です。

application/x-www-form-urlencodedのAPI（/text/contacts）。

```
curl -X POST http://localhost:3333/text/contacts \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "title=テストタイトル&email=test@example.local&message=Textレスポンス"
```

application/jsonのAPI（/json/contacts）。

```
curl -X POST http://localhost:3333/json/contacts \
  -H "Content-Type: application/json" \
  -d '{"title":"テストタイトル","email":"test@example.local","message":"JSONレスポンス"}'
```

## Web連携

Simple Basic Webのextension/api-expressブランチをcloneして実行。

> URLを独自に変更しているなら、適宜変更。


# セットアップ方法

## 前提条件

- ローカル環境でPostgreSQLが実行されており、testdb, contactsテーブルが作成されていること。
  - host : localhost
  - database : testdb
  - user : dbuser
  - password : postgres
  - port : 5432


想定されるDBのテーブルCREATE文。

```sql
CREATE TABLE contacts (
	id SERIAL PRIMARY KEY,
	title VARCHAR(256),
	email VARCHAR(64),
	message TEXT,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

> 別途セットアップ手順を記述予定。

## API自体のセットアップ

clone後、npm isntall, node contact.jsの順で実行

```
git clone https://
cd simple-api-express
npm install
node contact.js
```

# Requirements

- node.js（いちおう22 LTS以上）

# 学習コンテンツとしてのゴール

## 技術系

- （Web）APIとは何かを理解し、説明してみる

## PM系

- APIの仕様書を作成してみる
- 他の技術でAPIを実装、デプロイしてみる

## テスト系（技術・PM共通）

- このAPIのテスト計画書を作成してみる
- このASPに対するテストシナリオを作成してみる
- テストを実行してみる
- テストを自動実行してみる
- テスト結果をまとめみる

# ライセンス

一応MIT licenseとしておきます。

# 関連コンテンツ

随時公開。