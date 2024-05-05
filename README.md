# Docs

## GET /protected

> DEMO

> Use cookies or add the `access_token` to the `authorization` header with the
> `Bearer` prefix

```bash
curl -v -H 'authorization: Bearer <access_token>' \
-X GET 'http://localhost:8080/protected'
```

## POST /auth/sign-up

Creates a user

```bash
curl -v -H 'Content-Type: application/json' \
-d '
{
  "email": "admin@admin.com",
  "password": "12345678"
}
' -X POST 'http://localhost:8080/auth/sign-up'
```

## POST /auth/sign-in

Signs a user in

> Sets `access_token` and `refresh_token` `HttpOnly` cookies

> Returns tokens in JSON (if you're not using cookies)

```bash
curl -v -H 'Content-Type: application/json' \
-d '
{
  "email": "admin@admin.com",
  "password": "12345678"
}
' -X POST 'http://localhost:8080/auth/sign-in'
```

## POST /auth/refresh

Refreshes an expired access token

> If you're using cookies, just make the request without a body

> Returns new tokens in JSON (if you're not using cookies)

```bash
curl -v -H 'Content-Type: application/json' \
-d '
{
  "refresh_token": "token",
}
' -X POST 'http://localhost:8080/auth/refresh'
```
