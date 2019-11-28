const global = require('../helper/global')
const config = require('../helper/config');


exports.checkToken = (req, res, next) => {
  console.log("Request Headers==>", req.headers)
  if (!req.headers['x-access-token'] && !req.headers['authorization']) {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
  let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  if (token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (token) {
    global.jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: 'Token is not valid',
          error: err
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: 'Auth token is not supplied'
    });
  }
};

