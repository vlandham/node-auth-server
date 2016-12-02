const urlParse = require('url').parse;
const express = require('express');
const http = require('http');
const zlib = require('zlib');

const config = require('../config');

const router = express.Router();

router.get('*', function(req, res, next) {
  let url = config.baseUrl + req.url;
  let options = urlParse(url);

  options.headers = req.headers;

  // Use the host of our known S3 bucket rather than the host from the
  // request otherwise S3 won't know how to find the right bucket and
  // it will try to redirect you to the S3 homepage.
  options.headers.host = options.host;

  let clientReq = http.request(options, (clientRes) => {
    res.statusCode = clientRes.statusCode;
    res.headers = clientRes.headers;

    if (res.statusCode >= 300 && res.statusCode <= 399 && res.headers.location) {
      return res.redirect(res.headers.location);
    }

    // If the content is compressed we need to decompress it before
    // sending it to the response because the internals of express
    // seem to always expect uncompressed data and always tries to
    // compress it again.
    let contentEncoding = clientRes.headers['content-encoding'];
    if (contentEncoding && contentEncoding.match(/^(gzip|deflate)$/)) {
      let unzip = zlib.createUnzip();
      clientRes = clientRes.pipe(unzip);
    }

    return clientRes.pipe(res);
  });
  clientReq.end();
});

module.exports = router;
