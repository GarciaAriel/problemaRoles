// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

  // use in views, ng-repeat="x in _.range(3)"
  
// .run(function($ionicPlatform) {
//   $ionicPlatform.ready(function() {
//     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
//     // for form inputs)
//     if (window.cordova && window.cordova.plugins.Keyboard) {
//       cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
//     }
//     if (window.StatusBar) {
//       // org.apache.cordova.statusbar required
//       StatusBar.styleDefault();
//     }
//   });
// })

//doooooooooooooooooooooooooooooooooooooooooooooooooo
.run(function ($rootScope, $location, AuthenticationService, RoleService, SessionService) {

  'use strict';

  // enumerate routes that don't need authentication
  var routesThatDontRequireAuth = ["/login"];
  var routesForAdmin = ["/admin"];

  // check if current location matches route  
  var routeClean = function (route) {
    return _.find(routesThatDontRequireAuth,
      function (noAuthRoute) {
            
       
        return _.str.startsWith(route, noAuthRoute);
      });
  };

  // check if current location matches route  
  var routeAdmin = function (route) {
    return _.find(routesForAdmin,
      function (noAuthRoute) {
        return _.str.startsWith(route, noAuthRoute);
      });
  };

  $rootScope.$on('$stateChangeStart', function (ev, to, toParams, from, fromParams) {
    // if route requires auth and user is not logged in
    if (!routeClean($location.url()) && !AuthenticationService.isLoggedIn()) {
      // redirect back to login
      ev.preventDefault();
      $location.path('/login');
    }
    else if (routeAdmin($location.url()) && !RoleService.validateRoleAdmin(SessionService.currentUser)) {
      // redirect back to login
      ev.preventDefault();
      $location.path('/error');
    }
  });
})

//doooooooooooooooooooooooooooooooooooooooooooooooooo
// .config(function ($httpProvider) {

//   'use strict';

//   var logsOutUserOn401 = ['$q', '$location', 'SessionService', function ($q, $location, SessionService) {
//     var success = function (response) {
//       return response;
//     };

//     var error = function (response) {
//       if (response.status === 401) {
//         //redirect them back to login page
//         $location.path('/login');

//         return $q.reject(response);
//       } else {
//         return $q.reject(response);
//       }
//     };

//     return function (promise) {
//       return promise.then(success, error);
//     };
//   }];

//   $httpProvider.responseInterceptors.push(logsOutUserOn401);
// })



.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        //templateUrl: 'templates/tab-dash.html',
        templateUrl: 'templates/login.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  //dooooooooooooooooooooooooooooooooooooooooooooooooooooo
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginController'
    })

    .state('app', {
      url: '/app', 
      templateUrl: 'templates/app.html',
      controller: 'AppController'
    })

    .state('admin', {
      url: '/admin', 
      templateUrl: 'templates/admin.html',
      controller: 'AppController'
    })

    .state('error', {
      url: '/error', 
      templateUrl: 'templates/error.html',
      controller: 'AppController'
    });
  //doooooooooooooooooooooooooooooooooooooooooooooooooooooo

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
