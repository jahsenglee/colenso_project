(function(){
    'use strict';

    var basex = require('basex');
    var express = require('express');

    var router = express.Router();

    var query_start = 'XQUERY declare namespace tei="http://www.tei-c.org/ns/1.0"; for $v in ';
    var query_end = ' return $v';

    /**
     * Open Query API Routing
     * Executes and returns an XQuery query
     */
    router.get('/query', function(req, res){
        var client = newClient();
        var query = req.query.query;

        console.log(query_start+query+query_end);
        client.execute(query_start+query+query_end, function(err, data){
            if (err){
                res.status(500).send(err);
            } else {
                res.send(data.result);
            }
        })
    });

    /**
     * Searches the XQuery index and returns the result
     */
    router.get('/index', function(req, res){
        var client = newClient();
        var index = req.query.index;
        //console.log('XQUERY index:'+index+'("docs")');

        client.execute('XQUERY index:'+'facets'+'("docs")', function(err, data){
            if (err){
                res.status(500).send(err);
            } else {
                res.send(data.result);
            }
        })

    });

    router.get('/dir', function(req, res){
        var client = newClient();
        var dir = req.query.dir;

        client.execute('XQUERY file:children("./lib/docs/'+dir+'")', function(err, data){
            if (err){
                res.status(404).send(err);
            } else {
                res.send(data.result);
            }
        })
    });

    /**
     * Return 404 for all unknown API commands
     */
    router.all('/*', function(req, res){
        res.status(404).send();
    });

    /**
     * Creates a new client connection
     */
    function newClient(){
        var client = new basex.Session('localhost', 1984, 'admin', 'admin');
        client.execute('OPEN docs');

        return client;
    }

    module.exports.routes = router;
})();
