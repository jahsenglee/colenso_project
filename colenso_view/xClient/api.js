(function(){
    'use strict';

    var basex = require('basex');
    var express = require('express');
    var X2JS = require('x2js');
    var x2js = new X2JS();

    var router = express.Router();

    var namespace = 'XQUERY declare default element namespace "http://www.tei-c.org/ns/1.0";\n';
    var client = newClient();
    //var query_end = ' return $v';

    /**
     * Open Query API Routing
     * Executes and returns the title and path as JSON
     */
    router.get('/query', function(req, res){
        var query = req.query.query;

        // var full_query = namespace + "for $v in docs\n" +
        //   "where contains ($v/body,'" + query + "')\n" +
        //   "return $v";

        var full_query = namespace + "for $v in .\n" +
            "where $v//title[. contains text '" + query + "' ]\n" + 
            "order by $v//title\n" + 
            "return <data>{$v//title}" +
                          "<path>{db:path($v)}</path>" +
                    "</data>";

        console.log(full_query);
        client.execute(full_query, function(err, data){
            if (err){
                res.status(500).send(err);
            } else {
                res.send(x2js.xml2js('<res>' + data.result + '</res>'));
            }
        })
    });

  /**
   * Querying a single document from the basex database
   */
  router.get('/querySingle', function(req, res) {
        var query = req.query.query;
        
        var full_query = "XQUERY " + 
          "doc('docs/" + query + "')";
        
        console.log(full_query);
        client.execute(full_query, function(err, data) {
            if (err) {
                res.status(500).send(err);
            } else {
              res.send(data.result);
            }
        })
    });

  /**
   * Querying based on XPath or XQuery
   */
  router.get('/queryXPath', function(req, res) {
    var query = req.query.query;

    query.replace('%20', ' '); // replace %20 with proper spaces
    var full_query = namespace + query ;

    console.log(full_query);
    client.execute(full_query, function(err, data) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(x2js.xml2js('<res>' + data.result + '</res>'));
      }
    })
  });

  /**
   * Querying based on Logical operators
   */
  router.get('/queryLogical', function(req, res) {
    var query = req.query.query;
    console.log(query);

    //Parsing
    var split = query.split(" ");
    
    var query = "";
    
    for(var i = 0; i < split.length; i++) {
      if(split[i] == '!!') {
        query += 'ftand ftnot ';
      } else if(split[i] == '||') {
        query += 'ftor ';
      } else if(split[i] == '$$') {
        query += 'ftand '
      }
      else {
        query += "'" + split[i] + "' "
      }
    }
    console.log(query);
    
    var full_query = namespace + "for $v in .\n" +
      "where $v//title[. contains text " + query + " ]\n" +
      "order by $v//title\n" +
      "return <data>{$v//title}" +
      "<path>{db:path($v)}</path>" +
      "</data>";
    
    console.log(full_query);
    client.execute(full_query, function(err, data) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(x2js.xml2js('<res>' + data.result + '</res>'));
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
