# Docs

## POST /auth/sign-up

Creates a user

```bash
curl -v -H 'Content-Type: application/json' \
-d '
{
  "email": "admin@admin.com",
  "password": "12345678"
}
' -X POST 'http://localhost:8080/auth/sign-up' | jq
```

## POST /auth/sign-in

Signs a user in

> Sets `access_token` and `refresh_token` `HttpOnly` cookies

```bash
curl -v -H 'Content-Type: application/json' \
-d '
{
  "email": "admin@admin.com",
  "password": "12345678"
}
' -X POST 'http://localhost:8080/auth/sign-in' | jq
```
