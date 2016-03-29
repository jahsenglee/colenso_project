angular.module('myApp.controllers').controller('MainCtrl',
  ['$scope',
    '$http',
    'searchService',
    function ($scope, $http, searchService) {
      $scope.searchBox = {searchString: ""};
      
      $scope.searchData = [];

      $scope.search = function () {
        // if string is not empty/spaces
        if ($scope.searchBox.searchString.match(/^\s*$/) === null) {
            $scope.searchData = searchService.query($scope.searchBox.searchString);
        }
      }
    }]);