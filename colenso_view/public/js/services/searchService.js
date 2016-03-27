var myModule = angular.module('myApp.services', []);

myModule.factory('searchService', function(){
  var searchService = {
    query: query()
  };

  var basex = require('basex');
  var client = new basex.Session("127.0.0.1", 1984, "admin", "admin");
  
  function query(searchString) {
    client.execute("XQUERY decalse default element namespace 'http://www.tei-c.org/ns/1.0'; " + 
    "//name[@type = 'place' and position() = 1 and . = 'Manawarakau']",
    function(err, res) {
      if (!err) return (res.result);
      else console.log("Could not get query: " + err);
    })
    
  }
})
