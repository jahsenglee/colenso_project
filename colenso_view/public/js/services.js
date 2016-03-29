'use strict';

var myModule = angular.module('myApp.services', []);

myModule.factory('searchService', function($http, $q){

  return {
    query: function (searchString) {
      return $http({
        method: 'GET',
        url: '/api/query?query=' + searchString
      });
    },
    
    querySingle: function(searchString) {
      return $http({
        method: 'GET',
        url: '/api/querySingle?query=' + searchString
      });
    },
    
    queryXPath: function(searchString) {
      return $http({
        method: 'GET',
        url: '/api/queryXPath?query=' + searchString
      });
    },
    
    queryLogical: function(searchString) {
      return $http({
        method: 'GET',
        url: '/api/queryLogical?query=' + searchString
      });
    }
  }
})
