'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/home', {
      templateUrl: 'partials/main',
      controller: 'MainCtrl',
    }).
    when('/advanced_search', {
      templateUrl: 'partials/advancedSearch',
      controller: 'AdvancedSearchCtrl'
    }).
    when('/viewer', {
      templateUrl: 'partials/viewer',
      controller: 'ViewerCtrl'
    }).
    when('/add', {
      templateUrl: 'partials/add'
    }).
    otherwise({
      redirectTo: '/home'
    });

  $locationProvider.html5Mode(true);
});
