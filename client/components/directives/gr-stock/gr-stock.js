(function(){
  'use strict';

  angular.module('grStockModule', [])//the empty array makes sure it doesn't fail if grGreetingModule is empty//
  //works like a controller, needs a name and dependencies//
  .factory('StockApi', ['$http', function($http){
    function quote(symbol){
      return $http.jsonp('http://dev.markitondemand.com/Api/v2/Quote/jsonp?symbol=' + symbol + '&callback=JSON_CALLBACK');
    }
    return {quote:quote};
  }])
  .directive('grStock', ['$interval', function($interval){ //html will look for lower case gr-greeting//
    var o = {}; //sets the directive object//
    o.restrict = 'A'; // 'A' means that it has to be used as an attribute //
    //this is telling it to go to THIS HTML page to render it, don't ever use //
    //relative paths, it will always cause problems.//
    o.templateUrl = '/components/directives/gr-stock/gr-stock.html'; //Path to the HTML page//
    o.scope = {symbol:'@'};   // Can equal false, true, or an empty object {} //
                 // true: creates its own child scope and inherits from the parent in the HomeCtrl or MainCtrl, false: inherits from its parent //
                 // {} is an isolated scope that is isolated from the system //
                 // here is how to create your own scope://
    o.link = function(scope, element, attrs){
      element.on('$destroy', function(){
        $interval.cancel(scope.id);
      });
    };

    o.controller = ['$scope', 'StockApi', function($scope, StockApi){
      function getQuote(){
        StockApi.quote($scope.symbol).then(function(response){
          $scope.quote = response.data.LastPrice;
        });
      }
      $interval(getQuote, 30000);

      getQuote();
    }];

    return o;// returns the directive object //
    //<gr-greeting> = E =  element //
    //<div gr-greeting> = A =  attribute we are using Attribute so it can be CSSed //
    //<div class=gr-greeting> = C = class, M stands for comment, but it's stupid //
  }]);
})();
