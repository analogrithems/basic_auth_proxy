/*
  basic_auth_proxy: a simple proxy to provide basic auth to a HTTP service

  Forked from wjimenez5271/digitalocean-api-broker
  Written by: William Jimenez & Daniel Imfeld
  Copyright (c) 2015

  wjimenez5271/digitalocean-api-broker was based originally on
  proxy-http-to-https.js: Basic example of proxying over HTTP to a target HTTPS server
  Copyright (c) Nodejitsu 2013
  Permission is hereby granted, free of charge, to any person obtaining
  a copy of this software and associated documentation files (the
  "Software"), to deal in the Software without restriction, including
  without limitation the rights to use, copy, modify, merge, publish,
  distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so, subject to
  the following conditions:
  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
  LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/


var https = require('https'),
    http  = require('http'),
    util  = require('util'),
    path  = require('path'),
    fs    = require('fs'),
    colors = require('colors'),
    httpProxy = require('http-proxy');
require('console-stamp')(console, '[HH:MM:ss.l]');

//
// Get parameters from cmd line args
//
var argv = require('yargs')
    .demand(['proxy_target','basic_auth_user','basic_auth_pass'])
    .argv;
var proxy_target = argv.proxy_target;
var basic_auth_user = argv.basic_auth_user;
var basic_auth_pass = argv.basic_auth_pass;

//
// Generate base64 encoding
//
var auth_header = new Buffer(basic_auth_user+":"+basic_auth_pass).toString('base64')

//
// Proxy server
//
var proxy = httpProxy.createProxyServer({});
var server = http.createServer(function(req, res) {
  console.log('HEADER:\n'+JSON.stringify(req.headers, null, 2) + '\nURL: '+ req.url);
  proxy.web(req, res, {
    target: proxy_target,
    agent  : http.globalAgent,
    headers: {
      Authorization: 'Basic '+auth_header
    }
  });
});


//
// Start 'er up
//
server.listen(5050);
console.log('http proxy server'.blue + ' started '.green.bold + 'on port '.blue + '5050'.yellow);
