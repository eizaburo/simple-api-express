


# 動作確認

application/x-www-form-urlencoded

```
curl -X POST http://localhost:3333/text/contacts \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "title=テストタイトル&email=test@example.local&message=テスト経由のメッセージ"
```

application/json

```
curl -X POST http://localhost:3333/json/contacts \
  -H "Content-Type: application/json" \
  -d '{"title":"テストタイトル","email":"test@example.local","message":"JSON経由のメッセージ"}'
```