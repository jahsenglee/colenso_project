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
            searchService.query($scope.searchBox.searchString)
              .then(function (res) {
                
                // have to check again as promise could have resolved after change
                if($scope.searchBox.searchString != "") {
                  $scope.searchData = res.data.res;
                }
              }, function failure(res) {
                console.log("Query failed: " + res);
              });
        } else {
          $scope.searchData = [];
        }
      }
    }]);