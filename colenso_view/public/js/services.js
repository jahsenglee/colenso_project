'use strict';

var myModule = angular.module('myApp.services', []);

myModule.factory('searchService', function($http, $q){

  return {
    query: function (searchString) {
      return $http({
        method: 'GET',
        url: '/api/query?query=' + searchString
      });
    }
  }
})
