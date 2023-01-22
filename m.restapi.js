/**/// ########################################################################
const fs = require('fs');
const https = require('https');
const http = require('http');

const express = require('express');
const bodyParser = require('body-parser');

/**/// ########################################################################
/**
 * This class is to serve as base class for a REST API.
 */
class cGenericREST
{
  constructor(options)
  {
    options ??= {};
    options.port ??= 9999;
    options.secure ??= false;

    this.app = express();

    // Set cross origin header to allow cross-origin request:
    this.app.use(function(req, res, next) {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
      next();
    });

    this.app.use(bodyParser.text());

    const _this = this;
    this.app.get('/*/', function(req, res) {
      _this.__handle('get', req, res);
    });

    this.app.post('/*/', function(req, res) {
      _this.__handle('post', req, res);
    });

    if(options.secure)
    {
      this.server = https.createServer({
        key: fs.readFileSync(options.certificates.key),
        cert: fs.readFileSync(options.certificates.cert)
      }, this.app);
    
      this.server.listen({ port: options.port }, (err) => {
        if(err)
        {
          console.log('Unable to connect the server or port: ', err);
          return;
        }
      });
    }
    else
    {
      this.server = http.createServer(this.app);

      this.server.listen({ port: options.port }, (err) => {
        if(err)
        {
          console.log('Unable to connect the server or port: ', err);
          return;
        }
      });

    }
  }

  /**
   * Parses the get URL and calls a method on this class to handle that call.
   * @param {object} req - express request object
   * @param {object} res - express response object
   */
  __handle(rtype, req, res)
  {
    let url = req._parsedUrl.pathname.replaceAll('/', ' ').trim();
    url = url.replaceAll(' ', '_');
    url = `${rtype}_${url}`;

    if(typeof this[url] === 'function')
    {
      let params = req.query;
      if(rtype === 'post')
      {
        params['_body'] = req.body;
      }
      this[url](req.query).then((response) =>{
        res.status(response.code).send(response.msg);
      });
    }
    else
    {
      res.status(404).send(`Handler for ${url} not found.`);
    }
  }

  /**
   * Makes sure params contains a list of entries
   * @param {array} list 
   * @param {object} params 
   * @returns true if all ok, or false if not
   */
  __validateParams(list, params)
  {
    params ??= {};
    this.valresponse = { code: 400, msg: ''};

    // Validate parameters:
    if(typeof list === 'string')
    {
      list = [list];
    }

    for (const item of list)
    {
      if(!(item in params))
      {
        this.valresponse.msg = `Missing parameter <${item}>`;
        return false;
      }
    }

    return true;
  }
}

/**///#########################################################################
module.exports = cGenericREST;
