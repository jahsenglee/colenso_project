angular.module('myApp.controllers').controller('MainCtrl',
  ['$scope',
    '$http',
    function($scope, $http) {
  $scope.searchBox = {searchString: "Test"};
  
  $scope.search = function() {
    // if string is not empty/spaces
    if($scope.searchBox.searchString.match(/^\s*$/) === null) {
      // TODO: send this to BaseX backend
    }
  }
}]);