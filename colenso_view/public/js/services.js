'use strict';

var myModule = angular.module('myApp.services', []);

myModule.factory('searchService', function($http, $q){
  var searchService = {}
  
  searchService.XMLDoc = "";

    searchService.getXMLDoc = function() {
      return searchService.XMLDoc;
    },
    
    searchService.addXMLDoc = function (doc) {
      searchService.XMLDoc = doc;
    },
    
    searchService.query = function (searchString) {
      return $http({
        method: 'GET',
        url: '/api/query?query=' + searchString
      });
    },
    
    searchService.querySingle = function(searchString) {
      return $http({
        method: 'GET',
        url: '/api/querySingle?query=' + searchString
      });
    },
    
    searchService.queryXPath = function(searchString) {
      return $http({
        method: 'GET',
        url: '/api/queryXPath?query=' + searchString
      });
    },
    
    searchService.queryLogical = function(searchString) {
      return $http({
        method: 'GET',
        url: '/api/queryLogical?query=' + searchString
      });
    }
  
  return searchService;
})
