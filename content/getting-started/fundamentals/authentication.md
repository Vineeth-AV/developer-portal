---
title: Authentication
description: How to authenticate
---

VDC API uses OAuth 2.0 Bearer Token to authenticate requests. This authentication method requires for you to pass a Bearer Token with your request. Here is an example of what a request looks like with a fake Bearer Token:

```shell {% showTitle=false %}
curl "https://api.verteil.com/v4/orders/NDC/BA/ABCDEF" \
  -H "Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAFnz2wAAAAAAxT
  mQbp%2BIHDtAhTBbyNJon%2BA72K4%3DeIaigY0QBrv6Rp8KZQQLOTpo9ubw5Jt?WRE8avbi"
```
You can generate the Bearer Token by passing your API Key and Secret through the `POST oauth2/token` endpoint.
