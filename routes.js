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
    // TODO lookup customer's URL based on :uid
    console.log(req.params.uid);
    res.writeHead(301, { Location: 'http://tailgators.ca/?post_type=tribe_events' });
    res.end();
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
      res.send({error:{message:"Missing required parameter: " + missing}})
    }
    var password = req.body.password;
    var uid = req.body.uid;
    var url = req.body.url;
    var owner = req.body.owner;
    // TODO add to the database
  });
}

/**
 * Returns a string from the array of params
 * if it is not contained in the body.
 */
function missingParam(body, params) {
  for ( var param in params ) {
    if (!body[param]) {
      return param;
    }
  } 
  return null;
}
