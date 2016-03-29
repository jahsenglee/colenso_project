(function(){
    'use strict';

    var basex = require('basex');
    var express = require('express');

    var router = express.Router();

    var namespace = 'XQUERY declare default element namespace "http://www.tei-c.org/ns/1.0";\n';
    //var query_end = ' return $v';

    /**
     * Open Query API Routing
     * Executes and returns an XQuery query
     */
    router.get('/query', function(req, res){
        var client = newClient();
        var query = req.query.query;

        // var full_query = namespace + "for $v in docs\n" +
        //   "where contains ($v/body,'" + query + "')\n" +
        //   "return $v";

        var full_query = namespace + "for $v in .\n" +
            "where $v//body[. contains text \"" + query + "\" ]\n" + 
            "order by $v//title\n" + 
            "return $v//title";

        console.log(full_query);
        client.execute(full_query, function(err, data){
            if (err){
                res.status(500).send(err);
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
