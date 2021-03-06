angular.module('myApp.controllers').controller('MainCtrl',
  ['$scope',
    '$http',
    'searchService',
    '$window',
    function ($scope, $http, searchService, $window) {
      $scope.searchBox = {searchString: ""};
      
      $scope.searchData = [];

      $scope.search = function () {
        // if string is not empty/spaces
        if ($scope.searchBox.searchString.match(/^\s*$/) === null) {
          searchService.query($scope.searchBox.searchString)
            .then(function (res) {
              // have to check again as promise could have resolved after change
              if ($scope.searchBox.searchString != "") {
                $scope.searchData = res.data.res.data; // Absolutely disgusting
              }
            }, function failure(res) {
              console.log("Query failed");
            });
        } else {
          $scope.searchData = [];
        }
      }
      
      $scope.openDoc = function(path) {
        searchService.querySingle(path)
          .then(function(res) {
            searchService.addXMLDoc(res.data);
          }, function failure(res) {
            console.log("Document load failed");
          });
      }
}]);