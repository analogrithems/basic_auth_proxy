# basic_auth_proxy
a simple proxy to provide basic auth to a HTTP service

### Usage
```
node main.js --proxy_target="http://something.tld/" --basic_auth_user="foo" --basic_auth_pass="bar"
```

### Requirements
* colors
* http-proxy
* yargs
