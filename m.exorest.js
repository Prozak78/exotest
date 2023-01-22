/**/// ########################################################################
const cGenericREST = require('./m.restapi.js');
const encoder = require('./m.encoder.js');

/**/// ########################################################################
class cExoREST extends cGenericREST
{
  // ######################################################
  async post_encoder(params)
  {
    let response = { code: 404, msg: 'Nothing found.'};

    const encoded = encoder(params['_body']);

    let json = { result: encoded };
    json = JSON.stringify(json);

    response.code = 200;
    response.msg = json;
    
    return response;  
  }  
}

/**///#########################################################################
module.exports = cExoREST;
