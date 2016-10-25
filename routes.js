var request = require('request');

var db = 'https://brandonsc.cloudant.com';
var dbUser = process.env.CLOUDANT_USER;
var dbPass = process.env.CLOUDANT_PASS;
var adminPass = process.env.ADMIN_PASS;

module.exports = function(app) {

  /**
   * API landing page
   */
  app.get('/', function (req, res) {
    res.send({version: "0.1.0"});
  });

  /**
   * Redirect to the URL maped to the :uid
   */
  app.get('/:uid', function(req, res) { 
    var uid = req.params.uid;
    findUrl(uid, function(error, response, body) {
      if (error) {
        res.status(500).send({error: {message: "Internal server error."}});
      } else {
        var docs = JSON.parse(body).docs;
        if (docs && docs.length === 0) {
          res.status(404).send({error:{message:"Not found."}});
        } else {
          res.writeHead(301, { Location: docs[0].url });
          res.end();
        }
      }
    });
  });

  /**
   * Adds a new beacon to the system.
   * @param password admin password
   * @param uid unique beacon ID
   * @param url webpage to redirect to
   * @param owner the customer's username
   */
  app.post('/beacon', function(req, res) {
    var missing = missingParam(req.body, ['password', 'uid', 'url', 'owner']);
    if (missing) {
      res.status(400).send({error:{message:"Missing required parameter: " + missing}})
    }
    var password = req.body.password;
    var uid = req.body.uid;
    var url = req.body.url;
    var owner = req.body.owner;

    if (password !== adminPass) { 
      res.status(401).send({error:{message:"Not authorized. Incorrect password."}});
    }

    res.send("TODO");
    //TODO request();
  });
}

/**
 * Returns a string from the array of params
 * if it is not contained in the body.
 */
function missingParam(body, params) {
  for ( var i=0; i<params.length; i++ ) {
    if (!body[params[i]]) {
      return params[i];
    }
  } 
  return null;
}

/**
 * Find a URL in the database by looking up the uid.
 */
function findUrl(uid, callback) {
  var options = {
    url: db + '/web-pages/_find',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ 
      selector: {
        _id: { $gt: 0 },
        uid: uid
      }
    })
  };
  request.post(options, callback).auth(dbUser, dbPass);
}
