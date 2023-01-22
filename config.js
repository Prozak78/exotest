/**/// ####################################################
const config = {};

/**/// #################################################### certificates
config.certificates = {
  key: 'certificates/key.pem',
  cert: 'certificates/cert.pem'
};

/**/// #################################################### port
config.port = 4465;
config.secure = false;

/**/// #####################################################
module.exports = config;
