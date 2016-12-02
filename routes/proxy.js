const urlParse = require('url').parse;
const express = require('express');
const http = require('http');
const zlib = require('zlib');

const router = express.Router();
const baseUrl =
      'http://proquest-vector-client.s3-website-us-east-1.amazonaws.com';

router.get('*', function(req, res, next) {
  let url = baseUrl + req.url;
  let options = urlParse(url);

  options.headers = req.headers;
  options.headers.host = options.host;

  let clientReq = http.request(options, (clientRes) => {
    let contentEncoding = clientRes.headers['content-encoding'];

    if (contentEncoding && contentEncoding.match(/^(gzip|deflate)$/)) {
      let unzip = zlib.createUnzip();
      clientRes = clientRes.pipe(unzip);
    }

    clientRes.pipe(res);
  });
  clientReq.end();
});

module.exports = router;
