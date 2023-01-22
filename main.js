/**/// ########################################################################
// * Project ExoTest
// * Respond to a POST call with an encoded string.
// * Hugo Ferreira [22.Jan.2023]
/**/// ########################################################################

const cExoREST = require('./m.exorest.js');
const config = require('./config.js');

/**/// ########################################################################
function header()
{
  console.log('#####################################');
  console.log('# Exo REST Server - v0.1.0');
  console.log(`# Listening on Port: ${config.port}`);
  console.log('#####################################');
}

/**/// ########################################################################
function main()
{
  header(); 

  const options = {
    port: config.port,
    secure: config.secure,
    certificates: {
      key: config.certificates.key,
      cert: config.certificates.cert
    }
  };

  const exoREST = new cExoREST(options);
}

/**/// ########################################################################
main();
