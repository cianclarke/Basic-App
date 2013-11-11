var util = require('util');
/* main.js
 * All calls here are publicly exposed as REST API endpoints.
 * - all parameters must be passed in a single JSON paramater.
 * - the return 'callback' method signature is 'callback (error, data)', where 'data' is a JSON object.
*/

/* 'getConfig' server side REST API method.
 * Trivial example of pulling in a shared config file.
 */
exports.getConfig = function(params, callback) {
  console.log("In getConfig() call");
  var cfg = require("config.js");
  return callback(null, {config: cfg.config});
};

/**
 * Get the details of a Facebook user by username
 * @param {Object} params  This is options passed from our client act call.
 * @param {Function} callback Callback function we call with args callback(err, response)
 */
exports.getByFacebookUsername = function(params, callback) {
  var username = params.username;
  
  // Check username is provided
  if(!username || username === "") {
    return callback("username cannot be empty/undefined", null);
  }
  
  // Call the Facebook Graph API
  var request = require('request');
  request('http://graph.facebook.com/' + username, function(err, res, body) {
    if(err) {
      return callback({
        msg: "Facebook request error",
        err: err
      });
    }
    
    return callback(null, body);
  });
};