//File: controllers/ProxyReverso.js
var mongoose = require('mongoose');
var ProxyReverso  = mongoose.model('ProxyReverso');

//POST - Insert a new ProxyReverso in the DB
exports.addProxyReverso = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var proxyreverso = new ProxyReverso({
		idEds:    		req.body.idEds,
		ip: 			req.body.ip,
		nombre:  		req.body.nombre,
		ciudad:   		req.body.ciudad,
		departamento:  	req.body.departamento,
		ventas:    		req.body.ventas,
		tipo:  			req.body.tipo
	});

	proxyreverso.save(function(err, proxyreverso) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(proxyreverso);
	});
};

//GET - Return all ProxyReverso in the DB
exports.findAllProxysReversos = function(req, res) {
	ProxyReverso.find(function(err, proxyreversobd) {
    if(err) res.send(500, err.message);

    console.log('GET /proxyreversobd')
		res.status(200).jsonp(proxyreversobd);
	});
};

//GET - Return a ProxyReverso with specified Id
exports.findById = function(req, res) {
		console.log('GET by ID')
		ProxyReverso.findById(req.params.id, function(err, proxyreverso) {
    if(err) return res.send(500, err.message);
    console.log('GET /proxyreverso/' + req.params.id);
		res.status(200).jsonp(proxyreverso);
	});
};

//GET - Return a ProxyReverso with specified IdEDS
exports.findByEDS = function(req, res) {
		console.log('GET by ID_EDS')
	// ProxyReverso.findById(req.params.id, function(err, proxyreverso) {
		console.log('id eds: '+req.params.idEds)
		ProxyReverso.find({idEds: req.params.idEds}, function(err, proxyreverso) {
    if(err) return res.send(500, err.message);

    console.log('GET /proxyreverso/' + req.params.idEds);
		res.status(200).jsonp(proxyreverso);
	});
};

//PUT - Update a register already exists
exports.updateProxyReverso = function(req, res) {
		ProxyReverso.findById(req.params.id, function(err, proxyreverso) {
		proxyreverso.idEds   = req.body.idEds;
		proxyreverso.ip    = req.body.ip;
		proxyreverso.nombre = req.body.nombre;
		proxyreverso.ciudad  = req.body.ciudad;
		proxyreverso.departamento = req.body.departamento;
		proxyreverso.ventas   = req.body.ventas;
		proxyreverso.tipo = req.body.tipo;

		proxyreverso.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(proxyreverso);
		});
	});
};

// DELETE - Delete a ProxyReverso with specified ID
exports.deleteProxyReverso = function(req, res) {
	ProxyReverso.findById(req.params.id, function(err, proxyreverso) {
		proxyreverso.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};