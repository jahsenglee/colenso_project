angular.module('myApp.controllers').controller('ViewerCtrl',
  ['$scope',
    '$http',
    'searchService',
    function($scope, $http, searchService) {
      $scope.init = function() {
        $scope.XMLDoc = searchService.getXMLDoc();
      }
    }]);
