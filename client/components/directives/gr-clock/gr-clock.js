(function(){
  'use strict';

  angular.module('grClockModule', [])//the empty array makes sure it doesn't fail if grGreetingModule is empty//
  //works like a controller, needs a name and dependencies//
  .directive('grClock', [function(){ //html will look for lower case gr-greeting//
    var o = {}; //sets the directive object//
    o.restrict = 'A'; // 'A' means that it has to be used as an attribute //
    //this is telling it to go to THIS HTML page to render it, don't ever use //
    //relative paths, it will always cause problems.//
    o.templateUrl = '/components/directives/gr-clock/gr-clock.html'; //Path to the HTML page//
    o.scope = {};   // Can equal false, true, or an empty object {} //
                 // true: creates its own child scope and inherits from the parent in the HomeCtrl or MainCtrl, false: inherits from its parent //
                 // {} is an isolated scope that is isolated from the system //
                 // here is how to create your own scope://

    return o;// returns the directive object //
    //<gr-greeting> = E =  element //
    //<div gr-greeting> = A =  attribute we are using Attribute so it can be CSSed //
    //<div class=gr-greeting> = C = class, M stands for comment, but it's stupid //
  }]);
})();
