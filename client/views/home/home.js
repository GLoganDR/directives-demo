(function(){
  'use strict';

  angular.module('directives-demo')
  .controller('HomeCtrl', ['$scope', '$interval', 'Home', function($scope, $interval, Home){
    $scope.people = [{name:'Logan', age:27}, {name:'Sally', age:22}];
    $scope.symbols =['AAPL', 'GOOG', 'MSFT', 'AMZN'];
    $scope.zips =['37217', '37214', '37013', '37203'];
  }]);
})();

