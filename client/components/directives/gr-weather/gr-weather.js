/* jshint camelcase:false */
(function(){
  'use strict';

  angular.module('grWeatherModule', [])//the empty array makes sure it doesn't fail if grGreetingModule is empty//
  //works like a controller, needs a name and dependencies//
  .factory('WeatherApi', ['$http', function($http){
    function conditions(zip){
      return $http.jsonp('http://api.wunderground.com/api/a11890b19fe77087/conditions/q/' + zip + '.json?callback=JSON_CALLBACK');
    }
    return {conditions:conditions};
  }])
  .directive('grWeather', ['$interval', function($interval){ //html will look for lower case gr-greeting//
    var o = {}; //sets the directive object//
    o.restrict = 'A'; // 'A' means that it has to be used as an attribute //
    //this is telling it to go to THIS HTML page to render it, don't ever use //
    //relative paths, it will always cause problems.//
    o.templateUrl = '/components/directives/gr-weather/gr-weather.html'; //Path to the HTML page//
    o.scope = {zip:'@'};   // Can equal false, true, or an empty object {} //
                 // true: creates its own child scope and inherits from the parent in the HomeCtrl or MainCtrl, false: inherits from its parent //
                 // {} is an isolated scope that is isolated from the system //
                 // here is how to create your own scope://
    o.link = function(scope, element, attrs){
      element.on('$destroy', function(){
        $interval.cancel(scope.id);
      });
    };

    o.controller = ['$scope', 'WeatherApi', function($scope, WeatherApi){
      function getConditions(){
        WeatherApi.conditions($scope.zip).then(function(response){
          $scope.temperature = response.data.current_observation.temp_f;
          $scope.icon = response.data.current_observation.icon_url;
        });
      }
      $interval(getConditions, 300000);

      getConditions();
    }];

    return o;// returns the directive object //
    //<gr-greeting> = E =  element //
    //<div gr-greeting> = A =  attribute we are using Attribute so it can be CSSed //
    //<div class=gr-greeting> = C = class, M stands for comment, but it's stupid //
  }]);
})();
