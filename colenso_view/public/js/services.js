'use strict';

var myModule = angular.module('myApp.services', []);

myModule.factory('searchService', function($http, $q){

  this.query = function (searchString) {
    $http({
      method: 'GET',
      url: '/api/query?query=' + searchString
    }).then(function success(res) {
      console.log(res.data);
      return res.data;
    }, function error(res) {
      "Failed to query database: " + res;
    });
  }
  
  return this;
})
