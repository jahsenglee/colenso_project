var myModule = angular.module('myApp.services', []);

myModule.factory('searchService', function(){
  var searchService = {
    query: query()
  };
  
  function query(searchString) {
    $http({
      method: 'GET',
      url: '/api/query' + searchString
    }).then(function success(res) {
      console.log(res.data);
    }, function error(res) {
      "Failed to query database: " + res;
    })
  }
})
