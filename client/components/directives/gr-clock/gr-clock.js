(function(){
  'use strict';

  angular.module('grClockModule', [])//the empty array makes sure it doesn't fail if grClockModule is empty//
  //works like a controller, needs a name and dependencies//
  .directive('grClock', ['$interval', function($interval){ //html will look for lower case gr-greeting || Injecting interval here allows the update time to work //
    var o = {}; //sets the directive object//
    o.restrict = 'A'; // 'A' means that it has to be used as an attribute //
    //this is telling it to go to THIS HTML page to render it, don't ever use //
    //relative paths, it will always cause problems.//
    o.templateUrl = '/components/directives/gr-clock/gr-clock.html'; //Path to the HTML page//
    o.scope = {frequency:'@'};   // Can equal false, true, or an empty object {} //
                 // true: creates its own child scope and inherits from the parent in the HomeCtrl or MainCtrl, false: inherits from its parent //
                 // {} is an isolated scope that is isolated from the system //
                 // here is how to create your own scope://
    o.link = function(scope, element, attrs){    // link function lets you manipulate the DOM in real-time, element is the top level thing in your div, attrs are attributes on your tag //
      function updateTime(){        // this function will be called by the system periodically to update the time //
      scope.date = new Date();      // new Date() tells me what time it is NOW //
      }
      var id = $interval(updateTime, scope.frequency * 1);  //this will update the time depending on the scope frequency ** added var id to delete end the started timer when I navigate the site //
      element.on('$destroy', function(){  // This function ends the timer that was started when the DOM element is being destroyed//
        $interval.cancel(id);  // cancels the timer when you navigate away from that DOM //
      });
      updateTime();
    };        // Element is the top part of the widget //

    return o;// returns the directive object //
    //<gr-greeting> = E =  element //
    //<div gr-greeting> = A =  attribute we are using Attribute so it can be CSSed //
    //<div class=gr-greeting> = C = class, M stands for comment, but it's stupid //
  }]);
})();
