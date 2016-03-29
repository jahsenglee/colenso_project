angular.module('myApp.controllers').controller('AdvancedSearchCtrl',
  ['$scope',
    '$http',
    function($scope, $http) {
      $scope.searchBox = {
        searchString: "",
        searchType: "XPATH"
      };

      $scope.search = function() {
        // if string is not empty/spaces
        if($scope.searchBox.searchString.match(/^\s*$/) === null) {

        }
      }
      
    }]);
