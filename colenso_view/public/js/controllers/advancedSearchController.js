angular.module('myApp.controllers').controller('AdvancedSearchCtrl',
  ['$scope',
    '$http',
    'searchService',
    function($scope, $http, searchService) {
      $scope.searchBox = {
        searchString: "",
        searchType: "XPATH",
        searchData: []
      };

      $scope.search = function() {
        // if string is not empty/spaces
        if($scope.searchBox.searchString.match(/^\s*$/) === null) {
          if($scope.searchBox.searchType == 'XPATH') {
            searchService.queryXPath($scope.searchBox.searchString)
              .then(function (res) {
                // have to check again as promise could have resolved after change
                $scope.searchData = res.data.res.data; // Absolutely disgusting
                console.log($scope.searchData);
              }, function failure(res) {
                console.log("XPath/XQuery failed");
              });
          } else if ($scope.searchBox.searchType == 'LOGICAL') {
            searchService.queryLogical($scope.searchBox.searchString)
              .then(function (res) {
                // have to check again as promise could have resolved after change
                $scope.searchData = res.data.res.data; // Absolutely disgusting
              }, function failure(res) {
                console.log("Logical query failed");
              });
          }
        }
      }
      
    }]);
