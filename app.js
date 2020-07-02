var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    methodOverride = require("method-override"),
    mongoose = require('mongoose');

// Connection to DB
mongoose.connect('mongodb://userVC2:ywWE370Rwj0ABwMb@mongodb.terpel-poc.svc.cluster.local:27017/proxyreversobd', function(err, res) {
    console.log(`Connected to Database proxyreversobd ${err}`);
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var models = require('./models/ProxyReverso')(app, mongoose);
var ProxyReversoCtrl = require('./controllers/ProxyReverso');

// Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("<h3> Hello world! </h3>");
});
app.use(router);

// API routes
var proxyreverso = express.Router();

// For use GET and POST
proxyreverso.route('/proxyreverso')
    .get(ProxyReversoCtrl.findAllProxysReversos)
    .post(ProxyReversoCtrl.addProxyReverso);

// GET, PUT and DELETE by Id
/*
proxyreverso.route('/proxyreverso/:id')
  .get(ProxyReversoCtrl.findById)
  .put(ProxyReversoCtrl.updateProxyReverso)
  .delete(ProxyReversoCtrl.deleteProxyReverso);
*/

// GET, PUT and DELETE by Id
proxyreverso.route('/proxyreverso/:idEds')
    .get(ProxyReversoCtrl.findByEDS)
    .put(ProxyReversoCtrl.updateProxyReverso)
    .delete(ProxyReversoCtrl.deleteProxyReverso);

app.use('/api', proxyreverso);

// Start server
//app.listen(3001, function() {
    //console.log("Node server running on http://localhost:3001/");
//});
var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080

var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

 

app.listen(server_port, function () {

  console.log( "Listening on " + server_ip_address + ", port " + server_port )

});